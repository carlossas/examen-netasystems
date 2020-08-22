import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//RXJS
import { Observable, Subscription } from 'rxjs';
import { map, retry } from 'rxjs/operators';
//URL SERVICIO API
import { URL_SERVICIOS } from '../../config/config';
//HEADER
import { HeadersService } from '../../config/header';
//JSON WEB TOKEN
import { JwtHelperService } from '@auth0/angular-jwt'
//MODELOS
import { Usuario } from '../../models/usuario';
import { RespuestaServidor } from '../../models/respuesta-servidor';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //JST SERVICE
  public jwtS = new JwtHelperService();
  //TOKEN 
  public token: string;
  //DATOS DEL USUARIO
  public usuario: Usuario;

  constructor(
    public http: HttpClient,
    public headersS: HeadersService,
    public router: Router,
  ) {
    this.cargarStorage();
  }


  //VERIFICAR LOS PERMISOS DE USUARIO (modulo padre lleva el slash /)

  public verificarAdmin(): boolean {
    
    if(this.usuario.admin){
      return true;
    }else{
      return false;
    }

  }



  //VALIDAD USUARIO - LOGIN
  public login(usuario): Observable<RespuestaServidor> {
    let url = URL_SERVICIOS + '/login';
    let headers = this.headersS.createHeaders();
    return this.http.post(url, usuario, { headers: headers }).pipe(
      map((res: RespuestaServidor) => {        
        console.log("-->Login respuesta", res);
        console.log("-->Usuario", this.jwtS.decodeToken(res.data.token));
        return res;
        
      }),
      retry(5)
    );
  }


  verficiarToken() {
    if (this.token) {
      return true;
    } else {
      this.cerrarSesion();
      return false;
    }
  }


  validarToken(): Observable<RespuestaServidor> {
    //SI EL TOKEN EXISTE, ENTONCES VERIFICAMOS QUE AUN SEA VALIDO
    let url = URL_SERVICIOS + '/verificar-token';
    let headers = this.headersS.createHeaders();
    
    let data = {
    };

    return this.http.post(url, data, {headers: headers}).pipe(
      map((res: RespuestaServidor) => {
        return res;
      }));
  }

  //CARGAR EL STORAGE
  cargarStorage() {
    //SI EXISTE EL TOKEN EN LOCAL STORAGE
    if (localStorage.getItem("token")) {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      this.token = localStorage.getItem("token");
    }
  }

  //GUARDAR STORAGE
  guardarStorage() {
    if (this.token) {
      localStorage.setItem("usuario", JSON.stringify(this.usuario));
      localStorage.setItem("token", this.token);

    } else {
      localStorage.removeItem("usuario");
      localStorage.removeItem("token");
    }
  }

  //CERRAR SESION
  cerrarSesion() {
    this.usuario = null;
    this.token = null;
    this.guardarStorage();
  }


}
