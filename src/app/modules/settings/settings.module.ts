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

@NgModule({
  declarations: [
    EditSettingsComponent,
    SettingsComponent,
    SettingsListComponent,
    SettingsModalComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
})
export class SettingsModule {}
