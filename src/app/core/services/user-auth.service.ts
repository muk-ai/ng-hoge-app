import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { timeout } from 'rxjs/operators';

interface AuthResult {
  result: 'AlreadyCreated' | 'Created' | 'Error';
  error?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  async signInWithPopup(provider: firebase.auth.AuthProvider): Promise<AuthResult> {
    const result = await this.afAuth.signInWithPopup(provider);
    if (result.user) {
      const idToken = await result.user.getIdToken();
      const url = `${environment.apiHost}/auth/me`;
      try {
        await this.http
          .get(url, { responseType: 'text', ...this.authzHeaders(idToken) })
          .pipe(timeout(10 * 1000))
          .toPromise();
        return { result: 'AlreadyCreated' };
      } catch (error) {
        if (error.status === 404) {
          try {
            await this.http.post(url, '', this.authzHeaders(idToken)).toPromise();
            return { result: 'Created' };
          } catch (error) {
            return { result: 'Error', error };
          }
        } else {
          return { result: 'Error', error };
        }
      }
    }

    return { result: 'Error' };
  }

  private authzHeaders(idToken: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    });
    return { headers };
  }
}
