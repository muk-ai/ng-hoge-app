import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, first, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';

export function checkExistenceUser(http: HttpClient, afAuth: AngularFireAuth) {
  return () => {
    return afAuth.idToken.pipe(
      first(),
      mergeMap(idToken => {
        if (!idToken) {
          return of();
        }

        // NOTE: dbにUserが存在するか確認している。
        //       firebaseではログインしていて、自前のapiにはUserが存在していない不整合な状態の時はfirebaseでログアウトする。
        //       次にfirebaseでログインした時にUserが作られるので不整合は解消される。
        const url = `${environment.apiHost}/auth/me`;
        return http.get(url, { responseType: 'text' }).pipe(
          mergeMap(_response => {
            // NOTE: Userは存在しているので問題なし
            return of();
          }),
          catchError((response: HttpErrorResponse) => {
            console.log(response);
            if (response.status === 404) {
              // NOTE: 不整合な状態なのでログアウトする
              afAuth.signOut();
            }
            return of();
          })
        );
      })
    );
  };
}
