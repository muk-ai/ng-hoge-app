import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import firebase from 'firebase/compat/app';
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
      const url = `${environment.apiHost}/auth/me`;
      try {
        await this.http.get(url).pipe(timeout(TIMEOUT_MSEC)).toPromise();
        return { result: 'AlreadyCreated' };
      } catch (error: unknown) {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 404) {
            try {
              await this.http.post(url, '').pipe(timeout(TIMEOUT_MSEC)).toPromise();
              return { result: 'Created' };
            } catch (error) {
              throw { result: 'Error', error };
            }
          }
        }
        throw { result: 'Error', error };
      }
    }

    throw { result: 'Error' };
  }

  async deleteMyAccount(): Promise<void> {
    const currentUser = await this.afAuth.currentUser;
    if (!currentUser) {
      throw "couldn't get firebase user";
    }
    if (!Array.isArray(currentUser.providerData)) {
      throw 'no providerData';
    }

    const providerIds = currentUser.providerData.map(data => data?.providerId);
    const providerId = providerIds[0];
    if (!providerId) {
      throw 'no providerId';
    }

    switch (providerId) {
      case 'google.com':
        await currentUser.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
      case 'twitter.com':
        await currentUser.reauthenticateWithPopup(new firebase.auth.TwitterAuthProvider());
        break;
      default:
        throw 'no supported provider';
    }

    const url = `${environment.apiHost}/auth/me`;
    await this.http.delete(url).pipe(timeout(TIMEOUT_MSEC)).toPromise();
    await currentUser.delete();
    return;
  }

  async signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
