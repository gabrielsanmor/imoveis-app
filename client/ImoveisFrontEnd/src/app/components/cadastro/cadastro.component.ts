import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor() { }

  cadastro: FormGroup = new FormGroup({
    username: new FormControl(''),
    nome: new FormControl(''),
    sobrenome:new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    senha2: new FormControl(''),
  });

  ngOnInit(): void {
  }

  submit(){

  }

}
