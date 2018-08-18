import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileService {
    _baseURL: string = 'http://localhost:3000/api/uploads/'
    constructor(private http: HttpClient) { }

    upload(files, parameters){
        return  this.http.post(this._baseURL + 'image-profile', files)
                 .map(response => response)
                 .catch(error => Observable.throw(error));

    }
    getImages(){
        return this.http.get(this._baseURL)
                   .map(response => response)
                   .catch(error => Observable.throw(error));
    }
}
