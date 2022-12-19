import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const auth_url = 'http://127.0.0.1:8000/auth/'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(username:string,password:string) : Observable<any>{
    return this.http.post(auth_url+'/login/',{
      username,
      password
    },)
  }

  cadastro(username:string,first_name:string,last_name:string,
    senha:string,senha2:string,email:string){
      return this.http.post(auth_url+'/cadastro/',{
        username,
        first_name,
        last_name,
        senha,
        senha2,
        email
      },)
  }

  refreshToken(refresh:string){
    return this.http.post(auth_url+'/login/refresh',{
      refresh
    },)
  }


}
