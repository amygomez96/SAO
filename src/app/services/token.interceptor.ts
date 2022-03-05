import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from "js-cookie";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let account: any = localStorage.getItem('account')
    if (!account){
      account = Cookies.get('account');
    }

    if (account)
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + account
        }
      });

    return next.handle(request);
  }
}
