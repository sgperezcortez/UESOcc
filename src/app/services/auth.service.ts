import { Injectable } from "@angular/core";
import { JwtHelper } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  URL: string = "http://localhost:3000/api/users/login";

  constructor(private http: HttpClient) {}

  login(email: string, password: string){
    return this.http.post<any>(this.URL, {email, password})
    .map(res => this.setToken(res));
  }
  
  logout() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('ExpiresAt');
  }

  getToken() {
    return localStorage.getItem('TOKEN');
  }

  private setToken(token){
    localStorage.setItem('TOKEN', token.token);
    const expiresAt = this.getexpirationDate();
    localStorage.setItem('ExpiresAt', expiresAt.toString());

  }

  public loggedIn() {
    const token = this.getToken();
    if (!token) return false;
    const date = this.getexpirationDate();
    return (date.valueOf() > new Date().valueOf());

  }

  getexpirationDate() {
    const token = this.getToken();
    const decodedToken = new JwtHelper().decodeToken(token);
    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);
    return date;
  }

  get currentUser() {
    const token = this.getToken();
    if (!token) return null;
    return new JwtHelper().decodeToken(token);
  }

}