import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  constructor(private afAuth: AngularFireAuth) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.afAuth.idToken.pipe(
      first(),
      switchMap(idToken => {
        if (idToken && this.isApiRequest(request.url)) {
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          });
          request = request.clone({
            headers: headers,
          });
        }
        return next.handle(request);
      })
    );
  }

  private isApiRequest(targetUrl: string) {
    return targetUrl.startsWith(environment.apiHost);
  }
}
