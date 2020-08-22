import { RouterModule, Routes } from '@angular/router';

//RUTA PRINCIPAL
import { PanelComponent } from './panel.component';

//GUARDS
import { AuthGuardService as AuthGuard } from '../guards/auth.guard';
import { SuperUsuarioGuardService as SuperUserGuard } from '../guards/permisos/superusuario.guard';

//RUTAS HIJAS
import { MenuComponent } from './menu/menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const panelRoutes: Routes = [
    {
        path: 'panel',
        component: PanelComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'menu', component: MenuComponent },
            { path: 'usuarios', component: UsuariosComponent},
            { path: '', redirectTo: '/panel/menu', pathMatch: 'full' }
        ],

    }
];


export const PANEL_ROUTES = RouterModule.forChild(panelRoutes);
