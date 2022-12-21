import { Component, Input, OnInit } from '@angular/core';
import { Imovel } from 'src/app/model/imovel.model';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent implements OnInit {


  constructor() { }

  @Input() imovel?:Imovel
  img? :String

  ngOnInit(): void {
    this.img=this.imovel?.imagens[0].imagem
  }

}
