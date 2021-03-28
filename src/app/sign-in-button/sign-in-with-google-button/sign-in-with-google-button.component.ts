import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in-with-google-button',
  templateUrl: './sign-in-with-google-button.component.html',
  styleUrls: ['./sign-in-with-google-button.component.scss'],
})
export class SignInWithGoogleButtonComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  ngOnInit() {}

  async signIn() {
    const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    if (result.user) {
      const idToken = await result.user.getIdToken();
      const url = `${environment.apiHost}/auth/me`;
      this.http.get(url, this.authzHeaders(idToken)).subscribe(
        _response => {
          // NOTE: すでにユーザーは作成済なので何もしない
        },
        (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.http.post(url, '', this.authzHeaders(idToken)).subscribe(
              _response => {
                // NOTE: ユーザーを作成した時の処理
              },
              (_err: HttpErrorResponse) => {
                alert('ユーザーの作成に失敗しました。');
              }
            );
          }
        }
      );
    }
  }

  private authzHeaders(idToken: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    });
    return { headers };
  }
}
