import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Imovel } from 'src/app/model/imovel.model';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent implements OnInit {


  constructor(private router:Router) { }

  @Input() imovel?:Imovel
  img? :String
  lucro?:number

  ngOnInit(): void {
    if(this.imovel?.imagens[0]!=null){
      this.img=this.imovel?.imagens[0].imagem
    }
    else{
      this.img=""
    }
    if(this.imovel?.valor_venda){
      this.lucro=(((this.imovel.valor_venda-this.imovel.valor_compra!!)/this.imovel.valor_compra!!)*100)!!
      this.lucro=Number.parseInt(""+this.lucro)
    }

  }

  onClick(){
    this.router.navigate(['imoveis/editar/'+this.imovel?.id])

  }

}
