import { Routes, RouterModule } from '@angular/router';
//NO PAGE FOUND
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const appRoutes: Routes = [
  { path: '**', component: NopagefoundComponent },
];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
