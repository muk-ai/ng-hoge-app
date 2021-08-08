import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInWithGoogleButtonComponent } from './sign-in-with-google-button/sign-in-with-google-button.component';
import { SignOutButtonComponent } from './sign-out-button/sign-out-button.component';
import { SignInWithTwitterButtonComponent } from './sign-in-with-twitter-button/sign-in-with-twitter-button.component';
import { DeleteMyAccountButtonComponent } from './delete-my-account-button/delete-my-account-button.component';

@NgModule({
  declarations: [
    SignInWithGoogleButtonComponent,
    SignOutButtonComponent,
    SignInWithTwitterButtonComponent,
    DeleteMyAccountButtonComponent,
  ],
  imports: [CommonModule],
  exports: [
    SignInWithGoogleButtonComponent,
    SignOutButtonComponent,
    SignInWithTwitterButtonComponent,
    DeleteMyAccountButtonComponent,
  ],
})
export class SignInButtonModule {}
