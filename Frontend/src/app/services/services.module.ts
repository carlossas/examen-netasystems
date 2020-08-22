import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


//GUARDS
import { AuthGuardService } from '../guards/auth.guard';
import { SuperUsuarioGuardService } from '../guards/permisos/superusuario.guard';

//SERVICIOS
import { AuthService } from './auth/auth.service';
import { HeadersService } from '../config/header';
import { UtilidadesService } from './utilidades/utilidades.service';






@NgModule({
  declarations: [],
  providers: [
    AuthService,
    HeadersService,
    UtilidadesService,
    //Guards
    AuthGuardService,
    SuperUsuarioGuardService,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServicesModule { }
