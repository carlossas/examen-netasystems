import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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


//COMPONENTES
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';


//RUTAS
import { PAGES_ROUTES } from './pages.routes';



registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    PagesComponent,
    MomentFormatPipe,
    InicioComponent,
    
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
    FormsModule,
    PAGES_ROUTES,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class PagesModule { }

