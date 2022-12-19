import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

const url = 'http://127.0.0.1:8000/api/imoveis/'

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(url)
  }
}
