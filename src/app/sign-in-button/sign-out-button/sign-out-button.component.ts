import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss'],
})
export class SignOutButtonComponent implements OnInit {
  constructor(private userAuth: UserAuthService) {}

  ngOnInit() {}

  signOut() {
    this.userAuth.signOut();
  }
}
