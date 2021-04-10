import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { timeout } from 'rxjs/operators';

interface AuthResult {
  result: 'AlreadyCreated' | 'Created' | 'Error';
  error?: any;
}

const TIMEOUT_MSEC = 5 * 1000;

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
          .pipe(timeout(TIMEOUT_MSEC))
          .toPromise();
        return { result: 'AlreadyCreated' };
      } catch (error) {
        if (error.status === 404) {
          try {
            await this.http.post(url, '', this.authzHeaders(idToken)).pipe(timeout(TIMEOUT_MSEC)).toPromise();
            return { result: 'Created' };
          } catch (error) {
            throw { result: 'Error', error };
          }
        } else {
          throw { result: 'Error', error };
        }
      }
    }

    throw { result: 'Error' };
  }

  private authzHeaders(idToken: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    });
    return { headers };
  }
}
