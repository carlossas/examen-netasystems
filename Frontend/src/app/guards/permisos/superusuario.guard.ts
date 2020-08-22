import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class SuperUsuarioGuardService implements CanActivate {

    constructor(public authS: AuthService, public router: Router) {

    }

    canActivate(): boolean {
        
        //SI ES SUPER USUARIO
        if (this.authS.verificarAdmin()) {
            return true;
        } else {
            return false;
        }

    }
}