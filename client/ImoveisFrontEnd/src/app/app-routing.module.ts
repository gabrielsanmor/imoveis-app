import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddImoveisComponent } from './components/add-imoveis/add-imoveis.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ImoveisComponent } from './components/imoveis/imoveis.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth/auth-guard';

const routes: Routes = [
  {path:'',
  component:HomeComponent,
  children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'imoveis',component:ImoveisComponent},
    {path:'addimoveis',component:AddImoveisComponent}
  ],
  canActivate:[AuthGuard],data:{requiredAuth:true}},
  {path:'login',component: LoginComponent,canActivate:[AuthGuard],data:{requiredAuth:false}},
  {path:'cadastro',component:CadastroComponent,canActivate:[AuthGuard],data:{requiredAuth:false}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
