import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard, NoAuthGuard } from '../../domain';
import { LoginComponent } from './login';
import { AuthRoutingModule } from './auth-pages.routing';
import { AuthPagesComponent } from './auth-pages.component';
import { FooterModule } from '../../core/theme/footer';

@NgModule({
  declarations: [AuthPagesComponent, LoginComponent],
  imports: [
    /// angular
    CommonModule,
    ReactiveFormsModule,

    /// theme
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FooterModule,

    /// routing
    AuthRoutingModule,
  ],
  providers: [AuthGuard, NoAuthGuard],
})
export class AuthPagesModule {}
