import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-sign-in-with-google-button',
  templateUrl: './sign-in-with-google-button.component.html',
  styleUrls: ['./sign-in-with-google-button.component.scss'],
})
export class SignInWithGoogleButtonComponent implements OnInit {
  constructor(private userAuth: UserAuthService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.userAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(_ => {
        this.router.navigate(['/overview']);
      })
      .catch(_ => {
        alert('失敗しました。');
      });
  }
}
