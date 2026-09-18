import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isOpen = signal(false);

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  close() {
    this.isOpen.set(false);
  }

  navItems = [
    { label: 'Home', path: '/' },
    { label: 'UX Crimes', path: '/ux-crimes' },
    { label: 'Angular Crimes', path: '/angular-crimes' },
    { label: 'JavaScript Visual Lab', path: '/javascript-crimes' },
    { label: 'CSS Crimes', path: '/css-crimes' },
  ];
}
