import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuard } from '@domain/auth/guards/auth.guard';
import { NoAuthGuard } from '@domain/auth/guards/no-auth.guard';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  providers: [AuthGuard, NoAuthGuard],
})
export class AuthModule {}
