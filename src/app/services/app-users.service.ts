import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class AppUsersService {
  private serviceUrl = 'http://localhost:3000/api/users'

  constructor(private http: Http, private authHttp: AuthHttp) { }
  
  getAll() {
    return this.authHttp.get(this.serviceUrl)
      .map(response => response.json());
  }

  create(user){
    return this.authHttp.post(this.serviceUrl, user)
       .map(response => response.json());
  }

}