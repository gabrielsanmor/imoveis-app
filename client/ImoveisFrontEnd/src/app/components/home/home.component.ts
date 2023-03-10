import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:User|null=null
  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.user = this.authService.user.getValue()
  }

  logout(){
    this.authService.logout()
    window.location.reload()
  }

}
