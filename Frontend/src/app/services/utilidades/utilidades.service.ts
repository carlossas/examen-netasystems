import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

//MOMENTJS
import * as moment from 'moment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {
  //FECHA ACTUAL
  public fecha_actual: any = moment().locale('es').format('YYYY-MM-DD HH:mm');
  //ANCHO DE PANTALLA
  public innerWidth: number | string;
  //ALERTAS
  public mostrarAlerta: boolean = true;
  public alertaStyle: any;
  public textoAlerta: string = '';
  public animacionAlerta: boolean;
  //NAVEGADOR ACTUAL
  public navegador: string = 'unknow';
  public chrome: boolean = false;
  public firefox: boolean = false;
  

  constructor(
    public translate: TranslateService,
    private authS: AuthService
  ) {
    //LENGUAJE POR DEFECTO
    if(this.authS.usuario){
      this.translate.setDefaultLang(this.authS.usuario.language.toLocaleLowerCase());
    }else{
      this.translate.setDefaultLang('es');
    }
    //ASIGNAMOS EL NAVEGADOR EN USO
    this.detectarNavegador();
    //VERIFICAMOS EL TAMAÑO DE LA PANTALLA
    this.innerWidth = window.innerWidth;
  }

  public cambiarLenguaje(lang: string) {
    this.authS.usuario.language = lang;
    this.authS.guardarStorage();
    this.translate.use(lang);
  }

  public clickEvent(id: string): void {
    let elemento = document.getElementById(id);

    if (elemento) {
      // console.log("el click se hizo corretamente");
      elemento.click();
    }
  }

  detectarNavegador() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      this.navegador = "opera";
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
      this.navegador = "chrome";
      this.chrome = true;
    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
      this.navegador = "safari";
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
      this.navegador = "firefox";
      this.firefox = true;
    }
    else {
      this.navegador = "edge";
    }
  }

  scrollEnDiv(id: string, block?: boolean) {
    let elemento = document.getElementById(id);
    if (elemento) {
      elemento.scrollIntoView(block || false);
    }
  }

  alertaShow(texto: string, style: string, tiempo?: number) {
    this.textoAlerta = texto;

    switch (style) {
      case "black":
        // this.alertaStyle = 'background-color: #363D4A; color:white;'
        this.alertaStyle = { 'background-color': '#363D4A', 'color': 'white' }
        break;
      case "danger":
        this.alertaStyle = { 'background-color': '#A01F41', 'color': 'white', }
        break;
      case "ligth":
        this.alertaStyle = { 'background-color': '#ddebf8', 'color': 'black' }
        break;
      case "success":
        this.alertaStyle = { 'background-color': '#4caf50 ', 'color': 'white' }
        break;
      default:
        this.alertaStyle = { 'background-color': '#363D4A', 'color': 'white' }
        break;
    }
    this.mostrarAlerta = true;

    if (tiempo) {
      setTimeout(() => {

        this.animacionAlerta = true;
        setTimeout(() => {
          this.mostrarAlerta = false;
          this.animacionAlerta = false;
        }, 1200);
      }, tiempo * 1000);
    }
    //Por defecto despues de 8.5 segundos se cierra
    // setTimeout(() => {
    //   if (this.mostrarAlerta === true) {
    //     this.mostrarAlerta = false;
    //   }
    // }, 8500);
  }

  alertaHide() {
    this.mostrarAlerta = false;
  }


}
