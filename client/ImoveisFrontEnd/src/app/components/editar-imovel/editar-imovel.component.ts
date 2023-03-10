import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AnexoIn } from 'src/app/model/anexo-insert.model';
import { Anexo } from 'src/app/model/anexo.model';
import { Imovel } from 'src/app/model/imovel.model';
import { ImovelService } from 'src/app/services/imovel.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-imovel',
  templateUrl: './editar-imovel.component.html',
  styleUrls: ['./editar-imovel.component.css']
})
export class EditarImovelComponent implements OnInit {

  imov = new FormGroup({
    exibicao:new FormControl('',Validators.required),
    descricao:new FormControl('',Validators.required),
    logradouro:new FormControl('',Validators.required),
    area:new FormControl('',Validators.required),
    valor_venda:new FormControl('',),
    valor_compra:new FormControl('',Validators.required)
  })

  imovel?:Imovel={} as Imovel

  enviando=false

  constructor(private imovelService:ImovelService,
    private route:ActivatedRoute,
    private sna:MatSnackBar,
    private mat:MatDialog) { }

  ngOnInit(): void {
    var aux = Number.parseInt(this.route.snapshot.paramMap.get('id')!!)
    this.imovelService.get(aux).pipe(
      switchMap((value) =>{
        this.imovel=value
        this.imov.get('exibicao')?.setValue(this.imovel.exibicao!!)
        this.imov.get('logradouro')?.setValue(this.imovel.logradouro!!)
        this.imov.get('descricao')?.setValue(this.imovel.descricao!!)
        this.imov.get('area')?.setValue(""+this.imovel.area!!)
        this.imov.get('valor_compra')?.setValue(""+this.imovel.valor_compra!!)
        this.imov.get('valor_venda')?.setValue(""+this.imovel.valor_venda!!)
        this.imgInicioAt(this.imovel.imagens)
        return of(true)
      })
    ).subscribe({
      next: (value) => {

      },error: (err)=>{

      },complete:()=> {

      }
    })
  }

  submit(){
    var aux = this.imov.value as Imovel
    this.enviando=true
    this.imovelService.atualizar(this.imovel?.id!!,aux).pipe(
      switchMap((a)=>{
        aux=a
        this.images.forEach(element => {
          var j = {} as AnexoIn
          j.imagem=element
          j.imovel=aux.id
          console.log(j)
          console.log(aux)
          this.imovelService.inserirAnexo(j).subscribe({
          next: (value)=>{
            this.imagesInicio.push(value)
            this.images=[]
          },error: (err)=>{
            console.log(err)
          }
          })
          })
        return of(true)
    })).subscribe({
      complete: () =>{
        this.enviando=false
        this.sna.open("Atualizado com sucesso!","Ok")
      }
    }
    )


  }

  imagesInicio:Anexo[] = []
  images:File[] = []

  imgInicioAt(a:Anexo[]){
    this.imagesInicio=a
  }

  anAt(index:number, a:Anexo){
    return a
  }

  onFileSelected(event:any) {
    let fileList: FileList = event.target.files;
    for(var i=0;i<fileList.length;i++){
        let file: File = fileList[i];
        this.images.push(file)
    }
  }

  atualizar(index:number, a:File){
    return a
  }

  remover(a:File){
    const index = this.images.indexOf(a, 0);
    if (index > -1) {
       this.images.splice(index, 1);
    }

  }

  deletarAviso(a:Anexo){
    this.mat.open(AnexoDialogDelete,{data:a}).afterClosed().subscribe(
      resposta => {
        if(resposta)
          window.location.reload()
      }
    )
  }

}

@Component({
  selector: 'dialog-delete',
  templateUrl: './dialog-delete.html',
})
export class AnexoDialogDelete {
  constructor(
    public dialogRef: MatDialogRef<AnexoDialogDelete>,
    @Inject(MAT_DIALOG_DATA) public data: Anexo,
    private imovelService:ImovelService
  ) {}

  deletar(){
    this.imovelService.deleteAnexo(this.data.id!!).subscribe({
      next: (value) => {
        console.log(value)
      },error: (err) => {
        console.log(err)
      }
    })
  }
}
