import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInWithGoogleButtonComponent } from './sign-in-with-google-button/sign-in-with-google-button.component';
import { SignOutButtonComponent } from './sign-out-button/sign-out-button.component';
import { SignInWithTwitterButtonComponent } from './sign-in-with-twitter-button/sign-in-with-twitter-button.component';

@NgModule({
  declarations: [SignInWithGoogleButtonComponent, SignOutButtonComponent, SignInWithTwitterButtonComponent],
  imports: [CommonModule],
  exports: [SignInWithGoogleButtonComponent, SignOutButtonComponent, SignInWithTwitterButtonComponent],
})
export class SignInButtonModule {}
