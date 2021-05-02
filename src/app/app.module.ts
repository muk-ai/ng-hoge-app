import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BearerTokenInterceptor } from './core/interceptors/bearer-token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AngularFireModule.initializeApp(environment.firebase)],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BearerTokenInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
