import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-sign-out-button',
  templateUrl: './sign-out-button.component.html',
  styleUrls: ['./sign-out-button.component.scss'],
})
export class SignOutButtonComponent {
  constructor(private userAuth: UserAuthService, private router: Router) {}

  signOut() {
    this.userAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(_ => {
        alert('失敗しました');
      });
  }
}
