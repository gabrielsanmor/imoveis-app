import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CadastroModel } from '../../model/cadastro-model'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private authservice:AuthService) { }

  cadastro: FormGroup = new FormGroup({
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name:new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    senha2: new FormControl(''),
  });

  ngOnInit(): void {
  }

  submit(){
    var aux:CadastroModel= this.cadastro.value
    console.log(aux)
    this.authservice.cadastro(aux).subscribe({
      next(value) {
        console.log(value)
      },error(err) {
        console.log(err)
      },
      complete() {

      },
    })
  }

}
