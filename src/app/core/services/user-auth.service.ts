import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { mergeMap, timeout, map, catchError } from 'rxjs/operators';
import { from, Observable, of } from 'rxjs';

interface AuthResult {
  result: 'AlreadyCreated' | 'Create' | 'Created' | 'Error';
  error?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {}

  signInWithPopup(provider: firebase.auth.AuthProvider): Observable<AuthResult> {
    const url = `${environment.apiHost}/auth/me`;
    let idTokenRef: string;
    return from(this.afAuth.signInWithPopup(provider)).pipe(
      mergeMap(result => {
        if (result.user) {
          return from(result.user.getIdToken());
        }
        throw { result: 'Error', error: 'FirebaseError' };
      }),
      mergeMap(idToken => {
        idTokenRef = idToken;
        return this.http.get(url, { responseType: 'text', ...this.authzHeaders(idToken) }).pipe(timeout(10 * 1000));
      }),
      map(_response => {
        return { result: 'AlreadyCreated' } as AuthResult;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          return of({ result: 'Create' } as AuthResult);
        }
        throw { result: 'Error', error };
      }),
      mergeMap(result => {
        if (result.result === 'Create') {
          return this.http.post(url, '', this.authzHeaders(idTokenRef));
        } else {
          return of(result as AuthResult);
        }
      }),
      map((result: any) => {
        if (result === null) {
          return { result: 'Created' } as AuthResult;
        } else {
          return result as AuthResult;
        }
      }),
      catchError(error => {
        throw { result: 'Error', error };
      })
    );
  }

  private authzHeaders(idToken: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    });
    return { headers };
  }
}
