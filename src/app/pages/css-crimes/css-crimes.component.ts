import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-css-crimes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './css-crimes.component.html',
  styleUrl: './css-crimes.component.scss',
})
export class CssCrimesComponent {
  activeCase = signal(1);

  crimeDetected = signal(true);
  evidenceVisible = signal(false);

  inspectCrime() {
    this.evidenceVisible.set(true);
  }

  removeCrime() {
    this.crimeDetected.set(false);
    this.evidenceVisible.set(false);
  }

  openCase(caseNumber: number) {
    this.activeCase.set(caseNumber);

    this.crimeDetected.set(true);
    this.evidenceVisible.set(false);
  }
}
