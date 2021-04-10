import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-sign-in-with-twitter-button',
  templateUrl: './sign-in-with-twitter-button.component.html',
  styleUrls: ['./sign-in-with-twitter-button.component.scss'],
})
export class SignInWithTwitterButtonComponent implements OnInit {
  constructor(private userAuth: UserAuthService, private router: Router) {}

  ngOnInit() {}

  signIn() {
    this.userAuth
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(_ => {
        this.router.navigate(['/overview']);
      })
      .catch(_ => {
        alert('失敗しました。');
      });
  }
}
