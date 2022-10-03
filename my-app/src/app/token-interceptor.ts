import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from "rxjs";
import { LoginResponse } from "./auth/login/login.reponse";
import { AuthService } from "./auth/shared/auth.service";


@Injectable({
  providedIn : 'root'
})

export class TokenInterceptor implements HttpInterceptor{
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

      if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
          return next.handle(req);
      }
      // if (req.url.indexOf('refresh') >= 0 || req.url.indexOf('login') >= 0 ) {
      //   console.log(req)
      //   return next.handle(req);
      // }
      const jwtToken = this.authService.getJwtToken();

      //Nếu có token thực hiện add token, nếu có lỗi xử lý
      if (jwtToken) {
          return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
              if (error instanceof HttpErrorResponse
                  && error.status === 403) {
                  return this.handleAuthErrors(req, next);
              } else {
                  return throwError(error);
              }
          }));
      }
      return next.handle(req);
  }

  //xử lý lỗi khi gán token
  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
      : Observable<HttpEvent<any>> {
      if (!this.isTokenRefreshing) {
          this.isTokenRefreshing = true;
          this.refreshTokenSubject.next(null);

          return this.authService.refreshToken().pipe(
              switchMap((refreshTokenResponse: LoginResponse) => {
                  this.isTokenRefreshing = false;
                  this.refreshTokenSubject
                      .next(refreshTokenResponse.authenticationToken);
                  return next.handle(this.addToken(req,
                      refreshTokenResponse.authenticationToken));
              })
          )
      } else {
          return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((res) => {
                  return next.handle(this.addToken(req,
                      this.authService.getJwtToken()))
              })
          );
      }
  }

  //save token for header
  addToken(req: HttpRequest<any>, jwtToken: any) {
      return req.clone({
          headers: req.headers.set('Authorization',
              'Bearer ' + jwtToken)
    });
  }
}
