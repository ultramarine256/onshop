import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule,
  ],
})
export class MaterialThemeModule {}
