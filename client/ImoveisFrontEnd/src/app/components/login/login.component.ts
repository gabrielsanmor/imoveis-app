import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/login-model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,
    private router:Router) { }

  login: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
  }

  submit(){
    var aux:LoginModel = this.login.value
    this.authService.login(aux).subscribe({
      next(value) {
          console.log(value)
      },
      error(err) {
        console.log(err)
      },
      complete() {

      },
    })
  }

}
