import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth/auth-guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[AuthGuard],data:{requiredAuth:true}},
  {path:'login',component: LoginComponent,canActivate:[AuthGuard],data:{requiredAuth:false}},
  {path:'cadastro',component:CadastroComponent,canActivate:[AuthGuard],data:{requiredAuth:false}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
