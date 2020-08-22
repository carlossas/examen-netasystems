import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilidadesService } from '../../services/utilidades/utilidades.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public opcionUsuario: boolean = false;
  
  constructor(
    public authS: AuthService,
    private loading: NgxSpinnerService,
    public router: Router,
    public utilidadesS: UtilidadesService
  ) {

  }
  
  ngOnInit(){
    
  }

  ngOnDestroy(): void {
  }

  public cerrarSesion(){
    
    this.loading.show();

    setTimeout(() => {
      this.authS.cerrarSesion();
      this.loading.hide();
      this.router.navigate(['/usuario/login']);
    }, 800);
  }

}
