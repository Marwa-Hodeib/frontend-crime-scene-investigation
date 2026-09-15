import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-angular-crimes',
  standalone: true,
  imports: [],
  templateUrl: './angular-crimes.component.html',
  styleUrl: './angular-crimes.component.scss',
})
export class AngularCrimesComponent {
  status = signal('Offline');
  isOnline = signal(false);
  showError = signal(false);
  shakeError = signal(false);
  activeTab = signal<'vanilla' | 'angular'>('vanilla');

  // Vanilla JS
  goOnline() {
    const status = document.querySelector('#status');

    if (status) {
      if (this.isOnline()) {
        status.textContent = 'Offline';
        status.classList.remove('text-green-500');
        status.classList.add('text-red-500');
      } else {
        status.textContent = 'Online';
        status.classList.remove('text-red-500');
        status.classList.add('text-green-500');
      }
    }

    this.isOnline.set(!this.isOnline());

    this.showError.set(true);

    setTimeout(() => {
      this.shakeError.set(true);

      setTimeout(() => {
        this.shakeError.set(false);
      }, 400);
    }, 50);
  }

  //  Angular
  goOnlineAngular() {
    const newState = !this.isOnline();

    this.isOnline.set(newState);
    this.status.set(newState ? 'Online' : 'Offline');
  }

  //Tab change logic//
  selectTab(tab: 'vanilla' | 'angular') {
    this.activeTab.set(tab);
  }
}
