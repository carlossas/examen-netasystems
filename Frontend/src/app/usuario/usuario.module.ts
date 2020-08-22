import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//MODULO DE ANGULAR
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario.component';

//MODULO COMPARTIDO
import { SharedModule } from '../shared/shared.module';

//COMPONENTES DE ESTE MODULO
import { LoginComponent } from './login/login.component';

//RUTAS
import { USER_ROUTES } from './usuario.routes';

import { HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    UsuarioComponent,
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    CommonModule,
    SharedModule,
    USER_ROUTES,
    FormsModule,
    HttpClientModule
  ]
})
export class UsuarioModule { }
