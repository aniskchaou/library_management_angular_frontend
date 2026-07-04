import { Component, OnInit } from '@angular/core';
import { SuperAdminApiService } from '../services/super-admin-api.service';

@Component({
  standalone: false,
  selector: 'app-global-settings',
  template: `
    <div class="container-fluid px-4 py-3">
      <h4 class="mb-3">Platform Settings</h4>

      <ul class="nav nav-tabs mb-3" id="settingsTabs">
        <li class="nav-item" *ngFor="let tab of tabs">
          <a class="nav-link" [class.active]="activeTab === tab.id" (click)="activeTab = tab.id" href="javascript:void(0)">
            {{ tab.label }}
          </a>
        </li>
      </ul>

      <form *ngIf="settings" (ngSubmit)="save()">
        <!-- Email -->
        <div *ngIf="activeTab === 'email'" class="row g-3">
          <div class="col-md-6"><label class="form-label">Email Provider</label>
            <input class="form-control" [(ngModel)]="settings.emailProvider" name="emailProvider" placeholder="sendgrid / mailgun / smtp"></div>
          <div class="col-md-6"><label class="form-label">API Key</label>
            <input class="form-control" [(ngModel)]="settings.emailApiKey" name="emailApiKey" type="password"></div>
          <div class="col-md-6"><label class="form-label">From Address</label>
            <input class="form-control" [(ngModel)]="settings.emailFromAddress" name="emailFromAddress" type="email"></div>
          <div class="col-md-6"><label class="form-label">From Name</label>
            <input class="form-control" [(ngModel)]="settings.emailFromName" name="emailFromName"></div>
        </div>

        <!-- SMS -->
        <div *ngIf="activeTab === 'sms'" class="row g-3">
          <div class="col-md-6"><label class="form-label">SMS Provider</label>
            <input class="form-control" [(ngModel)]="settings.smsProvider" name="smsProvider" placeholder="twilio / nexmo"></div>
          <div class="col-md-6"><label class="form-label">API Key / SID</label>
            <input class="form-control" [(ngModel)]="settings.smsApiKey" name="smsApiKey" type="password"></div>
          <div class="col-md-6"><label class="form-label">API Secret / Token</label>
            <input class="form-control" [(ngModel)]="settings.smsApiSecret" name="smsApiSecret" type="password"></div>
          <div class="col-md-6"><label class="form-label">From Number</label>
            <input class="form-control" [(ngModel)]="settings.smsFromNumber" name="smsFromNumber"></div>
        </div>

        <!-- Storage -->
        <div *ngIf="activeTab === 'storage'" class="row g-3">
          <div class="col-md-6"><label class="form-label">Storage Provider</label>
            <input class="form-control" [(ngModel)]="settings.storageProvider" name="storageProvider" placeholder="s3 / gcs / azure"></div>
          <div class="col-md-6"><label class="form-label">API Key</label>
            <input class="form-control" [(ngModel)]="settings.storageApiKey" name="storageApiKey" type="password"></div>
          <div class="col-md-6"><label class="form-label">API Secret</label>
            <input class="form-control" [(ngModel)]="settings.storageApiSecret" name="storageApiSecret" type="password"></div>
          <div class="col-md-4"><label class="form-label">Bucket</label>
            <input class="form-control" [(ngModel)]="settings.storageBucketName" name="storageBucketName"></div>
          <div class="col-md-4"><label class="form-label">Region</label>
            <input class="form-control" [(ngModel)]="settings.storageRegion" name="storageRegion"></div>
          <div class="col-md-4"><label class="form-label">Default GB / Org</label>
            <input class="form-control" [(ngModel)]="settings.defaultStorageGbPerOrg" name="defaultStorageGbPerOrg" type="number"></div>
        </div>

        <!-- Payment -->
        <div *ngIf="activeTab === 'payment'" class="row g-3">
          <div class="col-md-6"><label class="form-label">Payment Gateway</label>
            <input class="form-control" [(ngModel)]="settings.paymentGateway" name="paymentGateway"></div>
          <div class="col-md-6"><label class="form-label">Stripe Publishable Key</label>
            <input class="form-control" [(ngModel)]="settings.stripePublishableKey" name="stripePublishableKey"></div>
          <div class="col-md-6"><label class="form-label">Stripe Secret Key</label>
            <input class="form-control" [(ngModel)]="settings.stripeSecretKey" name="stripeSecretKey" type="password"></div>
          <div class="col-md-6"><label class="form-label">Stripe Webhook Secret</label>
            <input class="form-control" [(ngModel)]="settings.stripeWebhookSecret" name="stripeWebhookSecret" type="password"></div>
        </div>

        <!-- OAuth/SSO -->
        <div *ngIf="activeTab === 'oauth'" class="row g-3">
          <div class="col-12"><label class="form-check-label me-3">
            <input type="checkbox" class="form-check-input me-1" [(ngModel)]="settings.googleOAuthEnabled" name="googleOAuthEnabled"> Enable Google OAuth
          </label></div>
          <div class="col-md-6"><label class="form-label">Google Client ID</label>
            <input class="form-control" [(ngModel)]="settings.googleClientId" name="googleClientId"></div>
          <div class="col-md-6"><label class="form-label">Google Client Secret</label>
            <input class="form-control" [(ngModel)]="settings.googleClientSecret" name="googleClientSecret" type="password"></div>
          <div class="col-12 mt-3"><label class="form-check-label me-3">
            <input type="checkbox" class="form-check-input me-1" [(ngModel)]="settings.githubOAuthEnabled" name="githubOAuthEnabled"> Enable GitHub OAuth
          </label></div>
          <div class="col-md-6"><label class="form-label">GitHub Client ID</label>
            <input class="form-control" [(ngModel)]="settings.githubClientId" name="githubClientId"></div>
          <div class="col-md-6"><label class="form-label">GitHub Client Secret</label>
            <input class="form-control" [(ngModel)]="settings.githubClientSecret" name="githubClientSecret" type="password"></div>
          <div class="col-12 mt-3"><label class="form-check-label me-3">
            <input type="checkbox" class="form-check-input me-1" [(ngModel)]="settings.ssoEnabled" name="ssoEnabled"> Enable SSO (SAML)
          </label></div>
          <div class="col-md-6"><label class="form-label">SSO Metadata URL</label>
            <input class="form-control" [(ngModel)]="settings.ssoMetadataUrl" name="ssoMetadataUrl"></div>
          <div class="col-md-6"><label class="form-label">Entity ID</label>
            <input class="form-control" [(ngModel)]="settings.ssoEntityId" name="ssoEntityId"></div>
        </div>

        <!-- Branding -->
        <div *ngIf="activeTab === 'branding'" class="row g-3">
          <div class="col-md-6"><label class="form-label">Platform Name</label>
            <input class="form-control" [(ngModel)]="settings.platformName" name="platformName"></div>
          <div class="col-md-6"><label class="form-label">Default Logo URL</label>
            <input class="form-control" [(ngModel)]="settings.defaultLogoUrl" name="defaultLogoUrl"></div>
          <div class="col-md-4"><label class="form-label">Primary Color</label>
            <input class="form-control" [(ngModel)]="settings.defaultPrimaryColor" name="defaultPrimaryColor" type="color"></div>
          <div class="col-md-4"><label class="form-label">Default Language</label>
            <input class="form-control" [(ngModel)]="settings.defaultLanguage" name="defaultLanguage"></div>
          <div class="col-md-4"><label class="form-label">Default Timezone</label>
            <input class="form-control" [(ngModel)]="settings.defaultTimezone" name="defaultTimezone"></div>
          <div class="col-md-4"><label class="form-label">Trial Duration (days)</label>
            <input class="form-control" [(ngModel)]="settings.trialDurationDays" name="trialDurationDays" type="number"></div>
        </div>

        <div class="mt-4 d-flex gap-2">
          <button type="submit" class="btn btn-primary" [disabled]="saving">
            {{ saving ? 'Saving...' : 'Save Settings' }}
          </button>
          <span class="text-success align-self-center" *ngIf="saved">âœ“ Saved</span>
        </div>
      </form>

      <div *ngIf="!settings" class="text-center py-5">
        <div class="spinner-border"></div>
      </div>
    </div>
  `
})
export class GlobalSettingsComponent implements OnInit {
  settings: any = null;
  activeTab = 'email';
  saving = false;
  saved = false;

  tabs = [
    { id: 'email', label: 'Email' },
    { id: 'sms', label: 'SMS' },
    { id: 'storage', label: 'Storage' },
    { id: 'payment', label: 'Payment' },
    { id: 'oauth', label: 'OAuth / SSO' },
    { id: 'branding', label: 'Branding & Locale' }
  ];

  constructor(private api: SuperAdminApiService) {}

  ngOnInit() {
    this.api.getGlobalSettings().subscribe(s => this.settings = s);
  }

  save() {
    this.saving = true;
    this.saved = false;
    this.api.updateGlobalSettings(this.settings).subscribe(() => {
      this.saving = false;
      this.saved = true;
      setTimeout(() => this.saved = false, 3000);
    }, () => this.saving = false);
  }
}

