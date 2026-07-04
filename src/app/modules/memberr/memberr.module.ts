import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberComponent } from './member/member.component';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { MemberModalComponent } from './member-modal/member-modal.component';
import MemberValidation from 'src/app/main/validations/MemberValidation';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { ViewMemberComponent } from './view-member/view-member.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ToastrModule } from 'ngx-toastr';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({ declarations: [
        MemberListComponent,
        MemberComponent,
        AddMemberComponent,
        EditMemberComponent,
        MemberModalComponent,
        ViewMemberComponent,
    ], imports: [SharedModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgxDatatableModule,
        NgbModalModule,
        NgbModule,
        NgSelectModule,
        NgxChartsModule,
        ToastrModule,
        MatCardModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTooltipModule,
        MatChipsModule,
        MatDialogModule], providers: [MemberValidation, provideHttpClient(withInterceptorsFromDi())] })
export class MemberrModule {}
