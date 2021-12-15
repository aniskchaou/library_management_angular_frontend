import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCirculationComponent } from '../circulations/add-circulation/add-circulation.component';
import { CirculationStatusComponent } from './circulation-status/circulation-status.component';
import { CirculationStatusListComponent } from './circulation-status-list/circulation-status-list.component';
import { CirculationModalComponent } from '../circulations/circulation-modal/circulation-modal.component';
import { EditCirculationStatusComponent } from './edit-circulation-status/edit-circulation-status.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import CirculationStatusValidation from 'src/app/main/validations/CirculationStatusValidation';
import { AddCirculationStatusComponent } from './add-circulation-status/add-circulation-status.component';
import { CirculationStatusModalComponent } from './circulation-status-modal/circulation-status-modal.component';

@NgModule({
  declarations: [
    AddCirculationStatusComponent,
    CirculationStatusComponent,
    CirculationStatusListComponent,
    CirculationStatusComponent,
    EditCirculationStatusComponent,
    CirculationStatusModalComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [CirculationStatusValidation],
})
export class CirculationStatusModule {}
