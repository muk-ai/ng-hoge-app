import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignInButtonModule } from '../sign-in-button/sign-in-button.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginPageRoutingModule, SignInButtonModule],
})
export class LoginPageModule {}
