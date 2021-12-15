import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CirculationComponent } from './circulation/circulation.component';
import { CirculationListComponent } from './circulation-list/circulation-list.component';
import { CirculationModalComponent } from './circulation-modal/circulation-modal.component';
import { AddCirculationComponent } from './add-circulation/add-circulation.component';
import { EditCirculationComponent } from './edit-circulation/edit-circulation.component';
import { ViewCirculationComponent } from './view-circulation/view-circulation.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import CirculationValidation from 'src/app/main/validations/CirculationValidation';

@NgModule({
  declarations: [
    CirculationComponent,
    CirculationListComponent,
    CirculationModalComponent,
    AddCirculationComponent,
    EditCirculationComponent,
    ViewCirculationComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [CirculationValidation],
})
export class CirculationsModule {}
