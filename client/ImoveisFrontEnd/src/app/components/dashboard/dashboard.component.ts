import { Component, OnInit } from '@angular/core';
import { Imovel } from 'src/app/model/imovel.model';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  maisRecentes:Imovel[]=[]
  maiorLucro:Imovel={} as Imovel
  lucroTotal=0
  em_estoque=0
  quantidade=0

  constructor(private imovelService:ImovelService) { }

  ngOnInit(): void {
    this.imovelService.dashboard().subscribe(
      result =>{
        this.maisRecentes=result.results[0].mais_recente
        this.maiorLucro=result.results[0].maior_lucro
        this.quantidade=result.results[0].quantidade
        this.em_estoque=result.results[0].em_estoque
        this.lucroTotal=result.results[0].lucro_total.lucroT.toFixed(2)

      }
    )
  }

}
