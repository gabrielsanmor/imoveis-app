import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { map, of, switchMap } from 'rxjs';
import { AnexoIn } from 'src/app/model/anexo-insert.model';
import { Imovel } from 'src/app/model/imovel.model';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-add-imoveis',
  templateUrl: './add-imoveis.component.html',
  styleUrls: ['./add-imoveis.component.css']
})
export class AddImoveisComponent implements OnInit {

  imov = new FormGroup({
    exibicao:new FormControl(''),
    descricao:new FormControl(''),
    logradouro:new FormControl(''),
    area:new FormControl(''),
    valor_venda:new FormControl(''),
    valor_compra:new FormControl('')
  })

  enviando=false

  constructor(private imovelService:ImovelService) { }

  ngOnInit(): void {
  }

  images:File[] = []

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

  submit(){
    var aux = this.imov.value as Imovel
    this.imovelService.inserir(aux).pipe(
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
            console.log(value)
          },error: (err)=>{
            console.log(err)
          }
          })
          })
        return of(true)
    })).subscribe()

  }

}
