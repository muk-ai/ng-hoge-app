import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-sign-in-with-twitter-button',
  templateUrl: './sign-in-with-twitter-button.component.html',
  styleUrls: ['./sign-in-with-twitter-button.component.scss'],
})
export class SignInWithTwitterButtonComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  signIn() {
    this.afAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }
}
