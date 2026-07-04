package com.dev.delta.services;

import com.dev.delta.entities.Organization;
import com.dev.delta.entities.Plan;
import com.dev.delta.entities.Subscription;
import com.dev.delta.entities.AuditLog;
import com.dev.delta.repositories.OrganizationRepository;
import com.dev.delta.repositories.PlanRepository;
import com.dev.delta.repositories.SubscriptionRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
public class StripeSubscriptionService {

    @Value("${stripe.api.key:sk_test_placeholder}")
    private String stripeApiKey;

    @Value("${stripe.webhook.secret:whsec_placeholder}")
    private String webhookSecret;

    @Autowired
    private OrganizationRepository orgRepo;

    @Autowired
    private PlanRepository planRepo;

    @Autowired
    private SubscriptionRepository subscriptionRepo;

    @Autowired
    private AuditLogService auditLogService;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    /**
     * Create a Stripe customer for an organization, then create a checkout session.
     */
    public String createCheckoutSession(Long orgId, Long planId,
                                        Subscription.BillingCycle cycle,
                                        String successUrl, String cancelUrl) throws StripeException {
        Organization org = orgRepo.findById(orgId)
                .orElseThrow(() -> new IllegalArgumentException("Organization not found: " + orgId));
        Plan plan = planRepo.findById(planId)
                .orElseThrow(() -> new IllegalArgumentException("Plan not found: " + planId));

        // Create or retrieve Stripe customer
        String customerId = org.getStripeCustomerId();
        if (customerId == null) {
            Customer customer = Customer.create(CustomerCreateParams.builder()
                    .setEmail(org.getContactEmail())
                    .setName(org.getName())
                    .putMetadata("orgId", orgId.toString())
                    .build());
            customerId = customer.getId();
            org.setStripeCustomerId(customerId);
            orgRepo.save(org);
        }

        String stripePriceId = (cycle == Subscription.BillingCycle.YEARLY)
                ? plan.getStripePriceIdYearly()
                : plan.getStripePriceIdMonthly();

        if (stripePriceId == null) {
            throw new IllegalStateException("Stripe price ID not configured for plan: " + plan.getName());
        }

        Session session = Session.create(SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                .setCustomer(customerId)
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setPrice(stripePriceId)
                        .setQuantity(1L)
                        .build())
                .setSuccessUrl(successUrl + "?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(cancelUrl)
                .putMetadata("orgId", orgId.toString())
                .putMetadata("planId", planId.toString())
                .putMetadata("cycle", cycle.name())
                .build());

        return session.getUrl();
    }

    /**
     * Called from webhook handler when subscription is created/updated.
     */
    public void handleSubscriptionActivated(String stripeSubscriptionId, String orgIdStr,
                                            String planIdStr, String cycleStr,
                                            long periodStart, long periodEnd) {
        Long orgId = Long.parseLong(orgIdStr);
        Long planId = Long.parseLong(planIdStr);
        Subscription.BillingCycle cycle = Subscription.BillingCycle.valueOf(cycleStr);

        Plan plan = planRepo.findById(planId).orElse(null);
        BigDecimal amount = (plan != null)
                ? (cycle == Subscription.BillingCycle.YEARLY ? plan.getPriceYearly() : plan.getPriceMonthly())
                : BigDecimal.ZERO;

        Optional<Subscription> existing = subscriptionRepo
                .findByOrganizationIdAndStatusNot(orgId, Subscription.SubStatus.CANCELED);

        Subscription sub = existing.orElse(new Subscription(orgId, planId, cycle));
        sub.setStatus(Subscription.SubStatus.ACTIVE);
        sub.setPlanId(planId);
        sub.setBillingCycle(cycle);
        sub.setStripeSubscriptionId(stripeSubscriptionId);
        sub.setAmount(amount);
        sub.setCurrentPeriodStart(LocalDate.ofEpochDay(periodStart / 86400));
        sub.setCurrentPeriodEnd(LocalDate.ofEpochDay(periodEnd / 86400));
        subscriptionRepo.save(sub);

        auditLogService.log(AuditLog.AuditAction.ASSIGN_PLAN, "Subscription", sub.getId(),
                "stripe-webhook", null, orgId,
                "Subscription activated via Stripe: " + stripeSubscriptionId);
    }

    /**
     * Cancel a subscription immediately.
     */
    public void cancelSubscription(Long orgId, String reason) throws StripeException {
        subscriptionRepo.findByOrganizationIdAndStatusNot(orgId, Subscription.SubStatus.CANCELED)
                .ifPresent(sub -> {
                    if (sub.getStripeSubscriptionId() != null) {
                        try {
                            com.stripe.model.Subscription stripeSub =
                                    com.stripe.model.Subscription.retrieve(sub.getStripeSubscriptionId());
                            stripeSub.cancel();
                        } catch (StripeException e) {
                            // Log but don't block local cancellation
                        }
                    }
                    sub.setStatus(Subscription.SubStatus.CANCELED);
                    sub.setCanceledAt(LocalDateTime.now());
                    sub.setCancelReason(reason);
                    subscriptionRepo.save(sub);
                });
    }

    public Map<String, Object> getSaasMetrics() {
        BigDecimal mrr = subscriptionRepo.calculateMrr();
        long activeSubs = subscriptionRepo.countActiveSubscriptions();
        long churnLast30d = subscriptionRepo.countChurnedSince(LocalDateTime.now().minusDays(30));
        long activeOrgs = orgRepo.countActive();

        return Map.of(
                "mrr", mrr,
                "activeSubscriptions", activeSubs,
                "activeOrganizations", activeOrgs,
                "churnLast30Days", churnLast30d
        );
    }

    public String getWebhookSecret() {
        return webhookSecret;
    }

    public void changePlan(Long orgId, Long newPlanId, Subscription.BillingCycle cycle) throws Exception {
        Stripe.apiKey = stripeApiKey;
        Plan newPlan = planRepo.findById(newPlanId)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        subscriptionRepo.findByOrganizationIdAndStatusNot(orgId, Subscription.SubStatus.CANCELED)
                .ifPresent(sub -> {
                    sub.setPlanId(newPlanId);
                    sub.setBillingCycle(cycle);
                    sub.setAmount(cycle == Subscription.BillingCycle.MONTHLY
                            ? newPlan.getPriceMonthly() : newPlan.getPriceYearly());
                    subscriptionRepo.save(sub);
                    // In production: call Stripe to update subscription item price
                });
    }

    public void activateTrial(Long orgId, Long planId, int days) {
        Organization org = orgRepo.findById(orgId)
                .orElseThrow(() -> new RuntimeException("Org not found"));

        Subscription trial = new Subscription();
        trial.setOrganizationId(orgId);
        trial.setPlanId(planId);
        trial.setStatus(Subscription.SubStatus.TRIALING);
        trial.setBillingCycle(Subscription.BillingCycle.MONTHLY);
        trial.setCurrentPeriodStart(LocalDate.now());
        trial.setCurrentPeriodEnd(LocalDate.now().plusDays(days));
        trial.setTrialEnd(LocalDate.now().plusDays(days));
        trial.setAmount(BigDecimal.ZERO);
        subscriptionRepo.save(trial);
    }

    public void createRefund(String chargeId, Long amountCents) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        com.stripe.param.RefundCreateParams.Builder refundParams =
                com.stripe.param.RefundCreateParams.builder().setCharge(chargeId);
        if (amountCents != null) {
            refundParams.setAmount(amountCents);
        }
        com.stripe.model.Refund.create(refundParams.build());
    }
}
