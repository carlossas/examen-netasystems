import { RouterModule, Routes } from '@angular/router';

//RUTA PRINCIPAL
import { PagesComponent } from './pages.component';

//GUARDS
import { AuthGuardService as AuthGuard } from '../guards/auth.guard';



//RUTAS HIJAS
import { InicioComponent } from './inicio/inicio.component';

// Provisional (Desarrollo)

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'inicio', component: InicioComponent },
            { path: '', redirectTo: '/inicio', pathMatch: 'full' }
        ],

    }
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
