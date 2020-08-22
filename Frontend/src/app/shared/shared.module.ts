import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// ANGULAR MATERIAL
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';



@NgModule({
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
        BrowserAnimationsModule,
        FormsModule,
        RouterModule,
        CommonModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        NopagefoundComponent,
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        NopagefoundComponent,
    ]
})
export class SharedModule { }
