import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BearerTokenInterceptor } from './core/interceptors/bearer-token.interceptor';

import { of } from 'rxjs';
import { catchError, first, mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
function initializeApp(http: HttpClient, afAuth: AngularFireAuth) {
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

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AngularFireModule.initializeApp(environment.firebase)],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [HttpClient, AngularFireAuth],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
