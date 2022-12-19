import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { LoginModel } from '../model/login-model';
import { TokenModel } from '../shared/auth/token-model';
import { User } from '../model/user.model';
import { CadastroModel } from '../model/cadastro-model';

const auth_url = 'http://127.0.0.1:8000/auth/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  user = new  BehaviorSubject<User | null>(null);
  jwtService: JwtHelperService = new JwtHelperService()

  login(login:LoginModel){
    return this.http.post(auth_url+'/login/',login,).
    pipe(
      map(
        (data) =>{
          var token = data as TokenModel

          localStorage.setItem('tokens',JSON.stringify(token))

          var user = this.jwtService.decodeToken(token.access) as User

          this.user.next(user)
          return true
        }),
        catchError((error) => {
          console.log(error);
          return of(false)
        })
      );
  }

  cadastro(cadastro:CadastroModel){
      return this.http.post(auth_url+'/cadastro/',cadastro)
  }

  refreshToken(refresh:string){
    return this.http.post<string>(auth_url+'/login/refresh',refresh,)
  }

  public getAccessToken():string|null{
    var aux = localStorage.getItem('tokens')
    if(aux){
      var tok = JSON.parse(aux) as TokenModel
      var isAccessExpired = this.jwtService.isTokenExpired(tok.access)
      if(isAccessExpired){
          this.user.next(null);
          return "";
      }

      var use = this.jwtService.decodeToken(tok.access) as User

      this.user.next(use)

      return tok.access
    }
    return ""
  }



}
