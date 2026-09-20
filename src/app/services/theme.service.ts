import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<Theme>('dark');

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as Theme | null;

      this.theme.set(savedTheme ?? 'dark');
      this.applyTheme(this.theme());
    } else {
      this.applyTheme('dark');
    }
  }

  toggleTheme() {
    const newTheme = this.theme() === 'dark' ? 'light' : 'dark';

    this.theme.set(newTheme);
    this.applyTheme(newTheme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', newTheme);
    }
  }

  private applyTheme(theme: Theme) {
    const html = this.document.documentElement;

    html.classList.toggle('dark', theme === 'dark');
    html.classList.toggle('light', theme === 'light');
  }
}
