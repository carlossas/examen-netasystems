import { RouterModule, Routes } from '@angular/router';
// RUTA PRINCIPAL
import { UsuarioComponent } from './usuario.component';
// RUTAS HIJAS
import { LoginComponent } from './login/login.component';
//GUARDS
import { AuthGuardService as AuthGuard } from '../guards/auth.guard';


const userRoutes: Routes = [
    {
        path: 'usuario',
        component: UsuarioComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

/**
* Ruta del modulo usuario.
* @const {any} USER_ROUTES Se almacenan aquí todas las rutas que tienen co-relación con movimientos del usuario
*/
export const USER_ROUTES = RouterModule.forChild(userRoutes);
