import { Routes } from '@angular/router';
import { Home } from './home';
import { CounterPage } from './pages/counter';
import { Prefs } from './pages/prefs';
import { CounterStore } from '../../demos/counter-store';

export const countingRoutes: Routes = [
  {
    path: '',
    component: Home,
    providers: [CounterStore],
    children: [
      {
        path: 'counter',
        component: CounterPage,
      },
      {
        path: 'prefs',
        component: Prefs,
      },
    ],
  },
];
