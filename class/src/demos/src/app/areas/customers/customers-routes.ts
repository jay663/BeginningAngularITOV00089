import { Routes } from '@angular/router';
import { Home } from './home';
import { List } from './pages/list';
import { CustomerStore } from './customer-store';

export const customerRoutes: Routes = [
  {
    path: '',
    component: Home,
    providers: [CustomerStore],
    children: [
      {
        path: '',
        component: List,
      },
    ],
  },
];
