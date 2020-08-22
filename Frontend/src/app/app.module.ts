import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/**
 * NgxSpinnerModule es una libreria para crear loadings en angular con typescript
 */
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
/**
 * APP_ROUTES contiene las rutas princiaples del app module
 */
import { APP_ROUTES } from './app-routing.module';

/**
* Modulos principales de la aplicación.
*
* PagesModule: En este modulo se encuentra todo en relación con la aplicación a realizar
* UsuarioModule: Aquí se encuentra todos los componentes y servicios que tienen relación directa solo con el usuario.
* PanelModule: En ese modulo se encuentra todo lo relacionado a control de usuarios y permisos.
*/

import { UsuarioModule } from './usuario/usuario.module';
import { PagesModule } from './pages/pages.module';
import { PanelModule } from './panel/panel.module';


/**
* Modulo de servicio
*/
import { ServicesModule } from './services/services.module';


import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    NgxSpinnerModule,
    UsuarioModule,
    PagesModule,
    PanelModule,
    ServicesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
