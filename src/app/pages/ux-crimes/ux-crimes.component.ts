import { Component } from '@angular/core';
import { Crime } from '../../shared/modals/crime.model.ts/crime.model.ts.component';
import { CrimeCardComponent } from '../../shared/components/crime-card/crime-card.component';

@Component({
  selector: 'app-ux-crimes',
  standalone: true,
  imports: [CrimeCardComponent],
  templateUrl: './ux-crimes.component.html',
  styleUrl: './ux-crimes.component.scss',
})
export class UxCrimesComponent {
  crime: Crime = {
    title: 'Hidden Submit Button',
    severity: 'Felony',
    description: 'Users cannot find the submit button.',
    evidence: 'Conversion rate decreased by 40%.',
  };
}
