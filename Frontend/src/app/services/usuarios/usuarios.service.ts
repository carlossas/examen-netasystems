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
//MODELOS
import { RespuestaServidor } from '../../models/respuesta-servidor';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  /**Array de usuarios*/
  public usuarios: Array<Usuario> = [];


  constructor(
    private headersS: HeadersService,
    private http: HttpClient
  ) { }


  public obtenerUsuarios(): Observable<RespuestaServidor> {
    let url = URL_SERVICIOS + '/usuarios/obtener';
    let headers = this.headersS.createHeaders();


    return this.http.get(url, { headers: headers }).pipe(
      map((res: RespuestaServidor) => {
        console.log("-->Respuesta Obtener Usuarios:", res);
        
        return res;
      }), retry(5));
  }


  public eliminarUsuario(id: number): Observable<RespuestaServidor> {
    let url = URL_SERVICIOS + '/usuarios/eliminar';
    let headers = this.headersS.createHeaders();
    let data = {
      id: id
    }

    return this.http.post(url, data, { headers: headers }).pipe(
      map((res: RespuestaServidor) => {
        console.log("-->Respuesta Eliminar Usuarios:", res);
        
        return res;
      }), retry(5));
  }


  public crearUsuario(usuario: Usuario): Observable<RespuestaServidor> {
    let url = URL_SERVICIOS + '/usuarios/crear';
    let headers = this.headersS.createHeaders();

    let data = usuario;

    return this.http.post(url, data, { headers: headers }).pipe(
      map((res: RespuestaServidor) => {
        console.log("-->Respuesta Crear Usuarios:", res);
        
        return res;
      }), retry(5));
  }


  public editarUsuarios(usuario: Usuario, cambiarPass:boolean): Observable<RespuestaServidor> {
    let url = URL_SERVICIOS + '/usuarios/editar';
    let headers = this.headersS.createHeaders();

    let data: any = usuario;
    data.cambiarPass = cambiarPass;

    return this.http.put(url, data, { headers: headers }).pipe(
      map((res: RespuestaServidor) => {
        console.log("-->Respuesta Editar Usuarios:", res);
        
        return res;
      }), retry(5));
  }
}
