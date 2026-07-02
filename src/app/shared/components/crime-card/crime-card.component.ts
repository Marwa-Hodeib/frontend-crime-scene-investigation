import { Component, Input } from '@angular/core';
import { Crime } from '../../modals/crime.model.ts/crime.model.ts.component';

@Component({
  selector: 'app-crime-card',
  standalone: true,
  templateUrl: './crime-card.component.html',
})
export class CrimeCardComponent {
  @Input() crime!: Crime;
}
