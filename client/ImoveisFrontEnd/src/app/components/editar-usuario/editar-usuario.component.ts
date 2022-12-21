import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name:new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
  })

  troc= new FormGroup({
    senha: new FormControl(''),
    senha_nova: new FormControl(''),
    senha_nova2: new FormControl(''),
  })
  constructor(private authService:AuthService,
    private router:Router) {
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

  edit(){
    var aux = this.editar.value as Atualizar
    aux.username=this.editar.get('username')?.value!!
    console.log(aux)
    this.authService.editarUsuario(aux,this.user!!.user_id!!).subscribe({
      next: (value) =>{
        this.router.navigate(['/dashboard'])
      },error: (err) => {
        console.log(err)
      }
    })
  }

  trocar():void{
    var aux = this.troc.value as TrocarSenha
    this.authService.trocarSenha(aux,this.user?.user_id!!).subscribe({
      next: (value) =>{
        this.router.navigate(['/imoveis'])
      },error: (err) => {
        console.log(err)
      }
    })
  }


}
