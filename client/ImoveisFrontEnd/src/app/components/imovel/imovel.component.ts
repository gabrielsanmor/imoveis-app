import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Imovel } from 'src/app/model/imovel.model';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent implements OnInit {


  constructor(
    private router:Router,
    private mat:MatDialog) { }

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

  deletarAviso(a:Imovel){
    this.mat.open(ImovelDialogDelete,{data:a}).afterClosed().subscribe(
      resposta => {
        if(resposta)
          window.location.reload()
      }
    )
  }

}

@Component({
  selector: 'imovel-delete',
  templateUrl: './imovel-delete.html',
})
export class ImovelDialogDelete {
  constructor(
    public dialogRef: MatDialogRef<ImovelDialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: Imovel,
    private imovelService:ImovelService
  ) {}

  deletar(){
    this.imovelService.delete(this.data.id!!).subscribe({
      next: (value) => {
      },error: (err) => {
        console.log(err)
      }
    })
  }
}
