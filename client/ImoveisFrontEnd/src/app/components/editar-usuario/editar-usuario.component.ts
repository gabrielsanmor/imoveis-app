import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Atualizar } from 'src/app/model/atualizar.model';
import { TrocarSenha } from 'src/app/model/trocar-senha.model';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  user:User|null = {}
  editar= new FormGroup({
    username: new FormControl('',Validators.required),
    first_name: new FormControl('',Validators.required),
    last_name:new FormControl('',Validators.required),
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    senha: new FormControl('',Validators.required),
  })

  troc= new FormGroup({
    senha: new FormControl('',Validators.required),
    senha_nova: new FormControl('',Validators.required),
    senha_nova2: new FormControl('',Validators.required),
  })
  constructor(private authService:AuthService,
    private sna:MatSnackBar
    ) {
    this.authService.getAccessToken()
    this.user= this.authService.user.getValue()
  }

  ngOnInit(): void {
    this.editar.get('username')?.disable()
    this.editar.get('username')?.setValue(this.user!!.username!!)
    this.editar.get('first_name')?.setValue(this.user!!.nome!!)
    this.editar.get('last_name')?.setValue(this.user!!.sobrenome!!)
    this.editar.get('email')?.setValue(this.user!!.email!!)
  }

  enviando=false

  edit(){
    var aux = this.editar.value as Atualizar
    aux.username=this.editar.get('username')?.value!!
    this.enviando=true
    console.log(aux)
    this.authService.editarUsuario(aux,this.user!!.user_id!!).subscribe({
      next: (value) =>{
        this.sna.open("Sucesso: seus dados serão trocados no proximo login","Ok")
      },error: (err) => {
        console.log(err)
        if(err.error.senha){
          this.sna.open("Senha incorreta","Ok")
          this.editar.get('senha')?.setErrors({diferente:true})
        }
        this.enviando=false
      }, complete: () =>{
        this.enviando=false
      }
    })
  }

  trocar():void{
    var aux = this.troc.value as TrocarSenha
    if(aux.senha_nova!=aux.senha_nova2){
      this.sna.open("As senhas não são iguais","Ok")
      this.troc.get('senha_nova')?.setErrors({diferente:true})
    }else{
      this.enviando=true
      this.authService.trocarSenha(aux,this.user?.user_id!!).subscribe({
        next: (value) =>{
          this.sna.open("Sucesso: seus dados serão trocados no proximo login","Ok")
        },error: (err) => {
          if(err.error.senha){
            this.sna.open("Senha incorreta","Ok")
            this.troc.get('senha')?.setErrors({diferente:true})
          }
          this.enviando=false
        },complete: () =>{
          this.enviando=false
        }
      })
    }
  }


}
