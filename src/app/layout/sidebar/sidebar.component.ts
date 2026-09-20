import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private themeService = inject(ThemeService);

  isOpen = signal(false);

  navItems = [
    { label: 'Home', path: '/' },
    { label: 'UX Crimes', path: '/ux-crimes' },
    { label: 'Angular Crimes', path: '/angular-crimes' },
    { label: 'JavaScript Visual Lab', path: '/javascript-crimes' },
    { label: 'CSS Crimes', path: '/css-crimes' },
  ];

  get theme() {
    return this.themeService.theme;
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  close() {
    this.isOpen.set(false);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
