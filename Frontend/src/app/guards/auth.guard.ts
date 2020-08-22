import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { URL_SERVICIOS, MODO } from 'src/app/config/config';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authS: AuthService, public router: Router) {

  }

  canActivate(): boolean {
    //SI EL TOKEN NO EXISTE
    if (!this.authS.verficiarToken()) {

      this.authS.cerrarSesion();
      this.router.navigate(['/usuario/login']);

      return false;
    } else {
      this.authS.validarToken().subscribe(res=>{ 
        if(res.error){
          console.log("Token invalido", res);
          this.authS.cerrarSesion();
          this.router.navigate(['/usuario/login']);
        }
       }, err=>{
        console.log("Token invalido", err);
        this.authS.cerrarSesion();
        this.router.navigate(['/usuario/login']);
      }); 
      return true;
    }

  }
}