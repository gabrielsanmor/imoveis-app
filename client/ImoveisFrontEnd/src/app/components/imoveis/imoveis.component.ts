import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  proxima=true
  pin=false
  pageN:number=1

  constructor(private imovelService:ImovelService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    var page = this.route.snapshot.paramMap.get('page')
    this.pageN = Number.parseInt(page!!)
    if(!page||this.pageN<=0){
      this.pageN=1
      this.pin=true
    }
    this.consultar()

  }

  atualizarPagina(n:number){
    this.pageN=this.pageN+n
    this.router.navigate(['/imoveis/'+this.pageN])
    this.consultar()
  }

  consultar(){
    this.imovelService.getAll(this.pageN).subscribe({
      next: (data) => {
        this.imovelResult=data
        this.proxima=data.next!=null
        this.imoveis= this.imovelResult.results
        console.log(this.imoveis)
      }, error: (e) =>{
        console.log(e)
      }
    })
  }


}
