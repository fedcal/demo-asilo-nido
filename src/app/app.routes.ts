import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Nido Arcobaleno — Nido d\'infanzia 0-3 anni Bologna'
  },
  {
    path: 'progetto-educativo',
    loadComponent: () =>
      import('./pages/progetto-educativo/progetto-educativo.component').then(
        (m) => m.ProgettoEducativoComponent
      ),
    title: 'Progetto Educativo — Nido Arcobaleno'
  },
  {
    path: 'sezioni',
    loadComponent: () => import('./pages/sezioni/sezioni.component').then((m) => m.SezioniComponent),
    title: 'Le Sezioni — Nido Arcobaleno'
  },
  {
    path: 'team',
    loadComponent: () => import('./pages/team/team.component').then((m) => m.TeamComponent),
    title: 'Il Team — Nido Arcobaleno'
  },
  {
    path: 'iscrizioni',
    loadComponent: () =>
      import('./pages/iscrizioni/iscrizioni.component').then((m) => m.IscrizioniComponent),
    title: 'Iscrizioni — Nido Arcobaleno'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
