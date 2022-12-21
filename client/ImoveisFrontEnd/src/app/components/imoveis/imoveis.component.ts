import { Component, OnInit } from '@angular/core';
import { ImoveisResult } from 'src/app/model/imoveis-result-model';
import { Imovel } from 'src/app/model/imovel.model';
import { ImovelService } from 'src/app/services/imovel.service';
import { ImovelComponent } from '../imovel/imovel.component';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css']
})
export class ImoveisComponent implements OnInit {

  imovelResult?:ImoveisResult
  imoveis?:Imovel[]

  constructor(private imovelService:ImovelService) { }

  ngOnInit(): void {
    this.imovelService.getAll(1).subscribe({
      next: (data) => {
        this.imovelResult=data
        this.imoveis= this.imovelResult.results
        console.log(this.imoveis)
      }, error: (e) =>{
        console.log(e)
      }
    })
  }

}
