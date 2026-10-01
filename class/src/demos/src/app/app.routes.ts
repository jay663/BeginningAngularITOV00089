import { Routes } from '@angular/router';
import { Home } from './pages/home';

import { Piping } from './pages/piping';

// named "modes" for your application.
// you can switch modes through using the routerLink directive, you can do it programatically using the router service, etc.
// the mode is reflected in the url displayed in the browser.
// this is awesome.
export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'counter',
    loadChildren: () => import('./areas/counting/counting.routes').then((r) => r.countingRoutes),
  },
  {
    path: 'pipes',
    component: Piping,
  },
  {
    path: 'customers',
    loadChildren: () => import('./areas/customers/customers-routes').then((c) => c.customerRoutes),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
