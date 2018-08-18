import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
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