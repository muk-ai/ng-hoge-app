import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountPageRoutingModule } from './account-page-routing.module';
import { AccountPageComponent } from './account-page/account-page.component';
import { SignInButtonModule } from '../sign-in-button/sign-in-button.module';

@NgModule({
  declarations: [AccountPageComponent],
  imports: [CommonModule, AccountPageRoutingModule, SignInButtonModule],
})
export class AccountPageModule {}
