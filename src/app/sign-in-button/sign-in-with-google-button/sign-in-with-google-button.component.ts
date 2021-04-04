import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';

import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-sign-in-with-google-button',
  templateUrl: './sign-in-with-google-button.component.html',
  styleUrls: ['./sign-in-with-google-button.component.scss'],
})
export class SignInWithGoogleButtonComponent implements OnInit {
  constructor(private userAuth: UserAuthService) {}

  ngOnInit() {}

  signIn() {
    this.userAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log('subscribeError');
        console.log(error);
      },
      () => {
        console.log('completed');
      }
    );
  }
}
