import { DxSchedulerModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
} from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    // dev-extreme
    DxSchedulerModule,

    // material
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    NgxPaginationModule,
    MatTableModule,
  ],
  exports: [
    // dev-extreme
    DxSchedulerModule,

    // material
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    NgxPaginationModule,
    MatTableModule,
  ],
})
export class ThirdPartyModule {}
