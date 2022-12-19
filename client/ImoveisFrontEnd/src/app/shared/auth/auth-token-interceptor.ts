import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { JwtHelperService } from '@auth0/angular-jwt';
  import { Observable, switchMap, throwError } from 'rxjs';
  import { AuthService } from 'src/app/services/auth.service';
  import { TokenModel } from './token-model';
  import { User } from 'src/app/model/user.model';
   
  @Injectable()
  export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(
      private jwtHelper: JwtHelperService,
      private authService: AuthService,
      private router: Router
    ) {}
    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
      if (req.url.indexOf('login') > -1 || req.url.indexOf('refreshtoken') > -1) {
        return next.handle(req);
      }
      
      const localStorageTokens = localStorage.getItem('tokens');
      var tok: TokenModel;
      if (localStorageTokens) {
        tok = JSON.parse(localStorageTokens) as TokenModel;
        var isTokenExpired = this.jwtHelper.isTokenExpired(tok?.access);
        if (!isTokenExpired) {
            return next.handle(req);
        } else {
            if(!this.jwtHelper.isTokenExpired(tok.refresh)){
                return this.authService.refreshToken(tok.refresh).pipe(
                switchMap((access:string) => {
                    tok.access= access
                    localStorage.setItem('tokens', JSON.stringify(tok));
                    var user = this.jwtHelper.decodeToken(
                        access
                    ) as User;
                    this.authService.user.next(user);
                    const transformedReq = req.clone({
                    headers: req.headers.set(
                    'Authorization',
                    `bearer ${access}`
                    ),
                    });
                    return next.handle(transformedReq);
                })
                );
            }else{
                this.router.navigate(['/']);
                return throwError(()=>'Sessão expirada');
            }
        }
      }
      this.router.navigate(['/']);
      return throwError(() => 'Chamada invalida');
    }
  }