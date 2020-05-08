import { DxSchedulerModule } from 'devextreme-angular';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSnackBarModule,
  MatStepperModule,
} from '@angular/material';

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
  ],
})
export class ThirdPartyModule {}
