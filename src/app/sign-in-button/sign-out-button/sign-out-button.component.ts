import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss'],
})
export class SignOutButtonComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {}

  signOut() {
    this.afAuth.signOut();
  }
}
