import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  login: FormGroup = new FormGroup({
    username: new FormControl(''),
    senha: new FormControl(''),
  });

  ngOnInit(): void {
  }

  submit(){

  }

}
