import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

export function authHttpServiceFactory (
  http: Http,
  options: RequestOptions,
) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    headerPrefix: 'JWT',
    headerName: 'Authorization',
    globalHeaders: [{
      'Content-Type': 'application/json'
    }]
  }), http, options); 
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ],
  declarations: []
})
export class AuthModule { }
