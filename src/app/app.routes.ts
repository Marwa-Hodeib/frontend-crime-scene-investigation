import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { UxCrimesComponent } from './pages/ux-crimes/ux-crimes.component';
import { AngularCrimesComponent } from './pages/angular-crimes/angular-crimes.component';
import { JavascriptCrimesComponent } from './pages/javascript-crimes/javascript-crimes.component';
import { CssCrimesComponent } from './pages/css-crimes/css-crimes.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'ux-crimes', component: UxCrimesComponent },
      { path: 'angular-crimes', component: AngularCrimesComponent },
      { path: 'javascript-crimes', component: JavascriptCrimesComponent },
      { path: 'css-crimes', component: CssCrimesComponent },
    ],
  },
];
