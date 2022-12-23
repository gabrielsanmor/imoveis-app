import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router:Router,
    private sna:MatSnackBar) { }

  login: FormGroup = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  enviando=false

  ngOnInit(): void {
  }

  submit(){
    var aux:LoginModel = this.login.value
    this.enviando=true
    this.authService.login(aux).subscribe({
      next: (value) => {
        if(value)
          this.router.navigate(['/dashboard'])
        else
          this.sna.open("Nenhuma conta ativa com estas credenciais","Ok")
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.enviando=false
      },
    })
  }

}
