import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSettingsComponent } from './edit-settings/edit-settings.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { TwilioSettingsComponent } from './twilio-settings/twilio-settings.component';
import { OpenaiSettingsComponent } from './openai-settings/openai-settings.component';
import { PaypalSettingsComponent } from './paypal-settings/paypal-settings.component';

@NgModule({
  declarations: [
    EditSettingsComponent,
    SettingsComponent,
    SettingsListComponent,
    SettingsModalComponent,
    EditSettingsComponent,
    TwilioSettingsComponent,
    OpenaiSettingsComponent,
    PaypalSettingsComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class SettingsModule {}
