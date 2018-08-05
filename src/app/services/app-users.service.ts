import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppUsersService {
  private serviceUrl = 'http://localhost:3000/api/users'

  constructor(private http: HttpClient) { }
  
  getAll() {
    return this.http.get<any>(this.serviceUrl)
  }

  create(user) {
    return this.http.post(this.serviceUrl, user)
       .map(response => response);
  }

}