import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

const access_token = 'auth-access'
const refresh_token = 'auth-refresh'
const user_key = 'auth-user'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token:string):void{
    window.sessionStorage.removeItem(access_token)
    window.sessionStorage.setItem(access_token,token)

    const user = this.getUser()
    if(user.id){
      this.saveUser({...user,accessToken:token})
    }
  }

  public saveUser(user:User):void{
    window.sessionStorage.removeItem(user_key)
    window.sessionStorage.setItem(user_key,JSON.stringify(user as JSON))
  }

  public getToken():string|null{
    return window.sessionStorage.getItem(access_token)
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(refresh_token);
    window.sessionStorage.setItem(refresh_token, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(refresh_token);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(user_key);
    if (user) {
      return JSON.parse(user) as User;
    }
    return {};
  }

}
