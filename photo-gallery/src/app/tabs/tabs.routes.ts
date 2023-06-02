import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../Home/tab1.page').then((m) => m.Home),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../Carteira/tab2.page').then((m) => m.Carteira),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../Perfil/tab3.page').then((m) => m.Perfil),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../Ofertas/tab4.page').then((m) => m.Ofertas),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
