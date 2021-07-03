import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BearerTokenInterceptor } from './core/interceptors/bearer-token.interceptor';
import { checkExistenceUser } from './core/initializers/check-existence-user';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AngularFireModule.initializeApp(environment.firebase)],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: checkExistenceUser,
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
