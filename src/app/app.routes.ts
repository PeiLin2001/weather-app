import { Routes } from '@angular/router';
import { Weather2Component } from './@components/weather2/weather2.component';

export const routes: Routes = [
  { path: '', redirectTo: 'weatherAPI', pathMatch: 'full' },
  { path: 'weatherAPI', component: Weather2Component },
  { path: '**', redirectTo: 'weatherAPI' },
];
