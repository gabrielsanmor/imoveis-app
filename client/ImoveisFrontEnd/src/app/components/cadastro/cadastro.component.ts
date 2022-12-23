import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CadastroModel } from '../../model/cadastro-model'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private authservice:AuthService,
    private sna:MatSnackBar,
    private router:Router) { }

  cadastro: FormGroup = new FormGroup({
    username: new FormControl('',Validators.required),
    first_name: new FormControl('',Validators.required),
    last_name:new FormControl('',Validators.required),
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    senha: new FormControl('',Validators.required),
    senha2: new FormControl('',Validators.required),
  });

  enviando=false

  ngOnInit(): void {
  }

  transmitrMensagem(erro:string){
    this.sna.open(erro,"Ok")
  }

  submit(){
    var aux:CadastroModel= this.cadastro.value
    if(aux.senha!=aux.senha2){
      this.transmitrMensagem("As senhas não são íguais")
      this.cadastro.get('senha2')?.setErrors({diferente:true})
    }else{
      this.enviando=true
      this.authservice.cadastro(aux).subscribe({
        next:(value) => {
          this.transmitrMensagem("Cadastrado com sucesso")
          this.router.navigate(['/login'])
        },error:(err:any)=> {
          aux=err.error
          if(aux.username){
            this.cadastro.get('username')?.setErrors({em_uso:true})
            this.transmitrMensagem("Um usuário com esse username já existe")
          }
          if(aux.email){
            this.cadastro.get('email')?.setErrors({em_uso:true})
            this.transmitrMensagem("Um usuário com esse email já existe")
          }
          this.enviando=false
        },complete:()=> {
          this.enviando=false
          console.log("aaa")
        }
      })
    }
  }

}
