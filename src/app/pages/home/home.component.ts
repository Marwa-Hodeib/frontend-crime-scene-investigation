import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

type Exhibit = {
  id: string;
  icon: string;
  label: string;
  title: string;
  description: string;
  route: string;
  color: string;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  securityCleared = signal(false);
  isScanning = signal(false);
  scanResult = signal<Exhibit | null>(null);

  exhibits: Exhibit[] = [
    {
      id: '001',
      icon: '👁️',
      label: 'UX CRIMES',
      title: 'User Experience',
      description: 'Interfaces that made someone ask: "Who designed this?"',
      route: '/ux-crimes',
      color: 'red',
    },
    {
      id: '002',
      icon: '⚡',
      label: 'ANGULAR CRIMES',
      title: 'Angular Crime Lab',
      description:
        "Where Angular developers occasionally forget they're using Angular.",
      route: '/angular-crimes',
      color: 'purple',
    },
    {
      id: '003',
      icon: '🧪',
      label: 'VISUAL LAB',
      title: 'JavaScript',
      description: "Don't just read the code. Watch it happen.",
      route: '/javascript-crimes',
      color: 'yellow',
    },
    {
      id: '004',
      icon: '🎨',
      label: 'CSS CRIMES',
      title: 'CSS Crime Scene',
      description:
        'Beautiful interfaces. Suspicious CSS. Questionable decisions.',
      route: '/css-crimes',
      color: 'cyan',
    },
  ];

  private scanCases = [...this.exhibits];

  constructor(private router: Router) {}

  enterMuseum() {
    this.securityCleared.set(true);
  }

  scanMuseum() {
    if (this.isScanning()) {
      return;
    }

    this.isScanning.set(true);
    this.scanResult.set(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.scanCases.length);

      this.scanResult.set(this.scanCases[randomIndex]);
      this.isScanning.set(false);
    }, 900);
  }

  investigateCase() {
    const result = this.scanResult();

    if (result) {
      this.router.navigate([result.route]);
    }
  }
}
