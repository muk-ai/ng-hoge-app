import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  async signInWithPopup(provider: firebase.auth.AuthProvider) {
    const result = await this.afAuth.signInWithPopup(provider);
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
