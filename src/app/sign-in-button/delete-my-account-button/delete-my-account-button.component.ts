import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-delete-my-account-button',
  templateUrl: './delete-my-account-button.component.html',
  styleUrls: ['./delete-my-account-button.component.scss'],
})
export class DeleteMyAccountButtonComponent implements OnInit {
  constructor(private userAuth: UserAuthService, private router: Router) {}

  ngOnInit() {}

  deleteMyAccount() {
    this.userAuth
      .deleteMyAccount()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(_ => {
        alert('失敗しました');
      });
  }
}
