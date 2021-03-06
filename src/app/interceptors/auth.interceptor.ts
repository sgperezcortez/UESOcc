import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('TOKEN');

    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `JWT ${idToken}`)
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }   
}