import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Imovel } from '../model/imovel.model';
import { ImoveisResult } from '../model/imoveis-result-model';
import { AnexoIn } from '../model/anexo-insert.model';
import { Anexo } from '../model/anexo.model';

const url = 'http://127.0.0.1:8000/api/imoveis/'

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  constructor(private http:HttpClient) { }

  getAll(page:number){
    return this.http.get<ImoveisResult>(url+"?page="+page)
  }

  get(id:number){
    return this.http.get<Imovel>(url+id+'/')
  }

  inserir(imovel:Imovel){
    imovel.valor_compra=Number.parseFloat((Math.round(imovel.valor_compra!! * 100) / 100).toFixed(2))
    if(imovel.valor_venda)
      imovel.valor_venda=Number.parseFloat((Math.round(imovel.valor_venda!! * 100) / 100).toFixed(2))
    return this.http.post<Imovel>(url+"add/",imovel)
  }

  atualizar(id:number,imovel:Imovel){
    return this.http.put<Imovel>(url+id+'/',imovel)
  }

  delete(id:number){
    return this.http.delete<Imovel>(url+id+'/')
  }

  dashboard(){
    return this.http.get<any>("http://127.0.0.1:8000/api/dashboard/")
  }

  inserirAnexo(anexo:AnexoIn){
    var aux = new FormData()
    aux.append('imovel',""+anexo.imovel!!)
    aux.append('imagem',anexo.imagem!!)
    return this.http.post<Anexo>(url+'anexo/add/',aux)
  }

  deleteAnexo(id:number){
    return this.http.delete<Anexo>(url+'anexo/detail/'+id+'/')
  }


}
