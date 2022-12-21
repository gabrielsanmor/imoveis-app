import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, map, ObservableInput, of, switchMap,firstValueFrom, Observable } from 'rxjs';
import { LoginModel } from '../model/login-model';
import { TokenModel } from '../shared/auth/token-model';
import { User } from '../model/user.model';
import { CadastroModel } from '../model/cadastro-model';
import { Token } from '@angular/compiler';

const auth_url = 'http://127.0.0.1:8000/auth/'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  user = new  BehaviorSubject<User | null>(null);
  jwtService: JwtHelperService = new JwtHelperService()

  login(login:LoginModel){
    return this.http.post(auth_url+'login/',login,).
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
    return this.http.post(auth_url+'cadastro/',cadastro)
  }

  refreshToken(refresh:string){
    return this.http.post<TokenModel>(auth_url+'login/refresh/',{
      'refresh':refresh
    },httpOptions)
  }

  public async getAccessToken():Promise<string|null>{
    var aux = localStorage.getItem('tokens')

    if(aux){
      var tok = JSON.parse(aux) as TokenModel
      var isAccessExpired = this.jwtService.isTokenExpired(tok.access)
      var isRefreshExpired = this.jwtService.isTokenExpired(tok.refresh)

      if(isAccessExpired){
        if(isRefreshExpired){
          this.user.next(null);
          return "";
        }else{
          this.refreshToken(tok.refresh).pipe(
            switchMap((a:TokenModel)=>{
              tok.access=a.access
              localStorage.setItem('tokens', JSON.stringify(tok));
              var user = this.jwtService.decodeToken(
                tok.access
              ) as User;
              this.user.next(user);
              return of(true)
              }
            )
          )
        }
      }
      var use = this.jwtService.decodeToken(tok.access) as User

      this.user.next(use)

      return tok.access
    }
    return ""
  }



}
