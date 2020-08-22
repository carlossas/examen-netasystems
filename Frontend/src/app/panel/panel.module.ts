import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//MODULES
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import localePy from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

//PIPES
import { MomentFormatPipe } from '../pipes/momentFormat.pipe';

//COMPONENTS
import { PanelComponent } from './panel.component';


//RUTAS
import { PANEL_ROUTES } from './panel.routes';
import { MenuComponent } from './menu/menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';



registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [PanelComponent, MenuComponent, UsuariosComponent],
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
    FormsModule,
    PANEL_ROUTES,
  ]
})
export class PanelModule { }
