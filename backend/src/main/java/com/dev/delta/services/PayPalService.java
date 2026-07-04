package com.dev.delta.services;

import com.dev.delta.dto.PayPalProperties;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PayPalService {

    private final PayPalProperties payPalProperties;

    @Autowired
    public PayPalService(PayPalProperties payPalProperties) {
        this.payPalProperties = payPalProperties;
    }

    public Payment createPayment(Double total, String currency,
                                 String method, String intent,
                                 String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.toString());

        Payment payment = new Payment();
        payment.setIntent(intent.toString());
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        APIContext apiContext = new APIContext(payPalProperties.getClientId(),
                payPalProperties.getClientSecret(),
                payPalProperties.getMode());

        return payment.create(apiContext);
    }

    public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        APIContext apiContext = new APIContext(payPalProperties.getClientId(),
                payPalProperties.getClientSecret(),
                payPalProperties.getMode());

        return payment.execute(apiContext, paymentExecution);
    }

    public Payment createPayPalPayment(Double total, String currency,
                                 String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.valueOf(total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        APIContext apiContext = new APIContext(payPalProperties.getClientId(),
                payPalProperties.getClientSecret(),
                payPalProperties.getMode());

        return payment.create(apiContext);
    }

    public Payment createPayment(Double total, String currency,
                                 String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.valueOf(total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");  // Can be "authorize" for authorization payments
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        APIContext apiContext = new APIContext(payPalProperties.getClientId(),
                payPalProperties.getClientSecret(),
                payPalProperties.getMode());

        return payment.create(apiContext);
    }

    public String createPayPalPayment(double amount, String description) throws Exception {
        // Create a PayPal API context using your credentials
        APIContext apiContext = new APIContext(payPalProperties.getClientId(),
                payPalProperties.getClientSecret(),
                payPalProperties.getMode()); // Use "live" for production

        // Create payment object
        Amount amountObj = new Amount();
        amountObj.setCurrency("USD");
        amountObj.setTotal(String.valueOf(amount)); // Ensure two decimal places

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amountObj);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        // Set redirect URLs
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("http://www.yoururl.com/cancel");
        redirectUrls.setReturnUrl("http://www.yoururl.com/return");
        payment.setRedirectUrls(redirectUrls);

        // Create the payment
        Payment createdPayment = payment.create(apiContext);

        // Return the payment approval URL
        List<Links> links = createdPayment.getLinks();
        for (Links link : links) {
            if (link.getRel().equalsIgnoreCase("approval_url")) {
                return link.getHref(); // This is the payment link
            }
        }
        throw new Exception("Payment link not found.");
    }

}
