import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInWithGoogleButtonComponent } from './sign-in-with-google-button/sign-in-with-google-button.component';
import { SignOutButtonComponent } from './sign-out-button/sign-out-button.component';

@NgModule({
  declarations: [SignInWithGoogleButtonComponent, SignOutButtonComponent],
  imports: [CommonModule],
  exports: [SignInWithGoogleButtonComponent, SignOutButtonComponent],
})
export class SignInButtonModule {}
