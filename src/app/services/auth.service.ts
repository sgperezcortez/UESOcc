import { Injectable } from "@angular/core";
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  URL: string = "http://localhost:3000/api/users/login";

  constructor(private http: HttpClient) {}

  login(email: string, password: string){
    return this.http.post<any>(this.URL, {email, password})
    .map(res => this.setSession(res))
    .shareReplay();
  }
  
  private setSession (authKey) {
    const idToken = authKey.token;
    const currentUser = new JwtHelper().decodeToken(idToken)
    const expiresAt = moment.unix(currentUser.exp).format('lll');
    localStorage.setItem('id_token', JSON.stringify(idToken));
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) )
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  loggedIn() {
    console.log(moment().isBefore(this.getExpiration()));
    return moment().isBefore(this.getExpiration());
  }

  getExpiration(){
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  get currentUser() {
    let idToken = localStorage.getItem('id_token');
    if (!idToken) return null;
    return new JwtHelper().decodeToken(idToken);
  }

}