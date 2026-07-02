import { Component } from '@angular/core';

@Component({
  selector: 'app-crime.model.ts',
  imports: [],
  templateUrl: './crime.model.ts.component.html',
  styleUrl: './crime.model.ts.component.scss',
})
export class CrimeModelTsComponent {}

export interface Crime {
  title: string;
  severity: 'Minor' | 'Major' | 'Felony';
  description: string;
  evidence: string;
}

// import { Crime } from '../models/crime.model';

// const crime: Crime = {
//   title: 'Hidden Submit Button',
//   severity: 'Felony',
//   description:
//     'Users cannot find the submit button.',
//   evidence:
//     'Conversion dropped 40%.'
// };
