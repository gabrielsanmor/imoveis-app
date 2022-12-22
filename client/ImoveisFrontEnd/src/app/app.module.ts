import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { AuthTokenInterceptor } from './shared/auth/auth-token-interceptor';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './shared/auth/auth-guard';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddImoveisComponent } from './components/add-imoveis/add-imoveis.component';
import { ImoveisComponent } from './components/imoveis/imoveis.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ImovelComponent } from './components/imovel/imovel.component';

export function jwtOptionFactor(authService:AuthService){
  return {
    tokenGetter:()=>{
      return authService.getAccessToken()
    },
    allowedDomains:["127.0.0.1:8000","localhost:8000"]
    ,disallowedRoutes:[
      "http://localhost:8000/auth/login/",
      "http://localhost:8000/auth/login/refresh/",
      "http://localhost:8000/auth/cadastro/",
      "http://127.0.0.1:8000/auth/login/",
      "http://127.0.0.1:8000/auth/login/refresh/",
      "http://127.0.0.1:8000/auth/cadastro/",
    ]

  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    DashboardComponent,
    AddImoveisComponent,
    ImoveisComponent,
    EditarUsuarioComponent,
    ImovelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide:JWT_OPTIONS,
        useFactory:jwtOptionFactor,
        deps:[AuthService]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
