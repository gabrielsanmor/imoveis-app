import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddImoveisComponent } from './components/add-imoveis/add-imoveis.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditarImovelComponent } from './components/editar-imovel/editar-imovel.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
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
    {path:'imoveis/add',component:AddImoveisComponent},
    {path:'imoveis/editar/:id',component:EditarImovelComponent},
    {path:'imoveis/:page',component:ImoveisComponent},
    {path:'editar-usuario',component:EditarUsuarioComponent}
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
