import { Component, OnInit } from '@angular/core';

//SERVICIO DE AUTENTICACION
import { AuthService } from '../../services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

//PLUGINS
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UtilidadesService } from '../../services/utilidades/utilidades.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RespuestaServidor } from '../../models/respuesta-servidor';
import Swal from 'sweetalert2'
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //JST SERVICE
  public jwtS = new JwtHelperService();

  user: string = '';
  password: string;

  constructor(
    public authS: AuthService,
    public router: Router,
    public http: HttpClient,
    private utilidadesS: UtilidadesService,
    private loading: NgxSpinnerService,

  ){
  }

  ngOnInit() { 
  }

  login(form: NgForm) {
    if (form.valid) {

      //Creamos un objeto para el usuario que se esta logueando
      let usuario = {
        user: form.value.user,
        password: form.value.password,
      };

      this.loading.show();
      setTimeout(() => {
        this.authS.login(usuario).subscribe((res: RespuestaServidor) => {          
          this.loading.hide();

          if (!res.error) {
            this.authS.token = res.data.token;
            this.authS.usuario = res.data.usuario;  
            if(res.data.usuario.admin == 1){
              this.authS.usuario.admin = true;
            }else{
              this.authS.usuario.admin = false;
            }       
            this.authS.guardarStorage();
            Swal.fire({
              icon: 'success',
              title: 'Perfecto',
              text: '¡Bienvenido de nuevo!'
            })
            this.router.navigate(['/inicio']);
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Alerta',
              text: res.msg
            });
          }

        }, error => {
          this.loading.hide();
          Swal.fire({
            icon: 'error',
            title: 'Alerta',
            text: 'Ocurrió un error al iniciar sesión.'
          })
        }
        )
      }, 800);

    }

    return;

  }

}
