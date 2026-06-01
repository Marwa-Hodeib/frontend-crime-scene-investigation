import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UxCrimesComponent } from './pages/ux-crimes/ux-crimes.component';
import { JavascriptCrimesComponent } from './pages/javascript-crimes/javascript-crimes.component';
import { AngularCrimesComponent } from './pages/angular-crimes/angular-crimes.component';
import { CssCrimesComponent } from './pages/css-crimes/css-crimes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ux-crimes', component: UxCrimesComponent },
  { path: 'javascript-crimes', component: JavascriptCrimesComponent },
  { path: 'angular-crimes', component: AngularCrimesComponent },
  { path: 'css-crimes', component: CssCrimesComponent },
];
