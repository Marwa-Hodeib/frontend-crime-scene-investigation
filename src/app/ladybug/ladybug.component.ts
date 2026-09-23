import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

type SplatColor = 'purple' | 'yellow' | 'blue' | 'pink' | 'green' | 'orange';

@Component({
  selector: 'app-ladybug',
  standalone: true,
  imports: [],
  templateUrl: './ladybug.component.html',
  styleUrl: './ladybug.component.scss',
})
export class LadybugComponent implements OnInit, OnDestroy {
  bugX = signal(300);
  bugY = signal(300);
  bugAngle = signal(0);

  isVisible = signal(true);
  showReport = signal(false);

  // 💥 Splat
  showSplat = signal(false);
  splatX = signal(300);
  splatY = signal(300);
  splatColor = signal<SplatColor>('purple');

  private animationFrame?: number;
  private directionTimer?: ReturnType<typeof setTimeout>;

  // Separate timers so we can properly cancel everything
  private reportTimer?: ReturnType<typeof setTimeout>;
  private splatTimer?: ReturnType<typeof setTimeout>;

  private routerSubscription?: Subscription;

  private x = 300;
  private y = 300;
  private angle = 0;
  private targetAngle = 0;
  private speed = 0.45;
  private targetSpeed = 0.45;
  private lastTime = 0;

  private readonly splatColors: SplatColor[] = [
    'purple',
    'yellow',
    'blue',
    'pink',
    'green',
    'orange',
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window === 'undefined') return;

    this.startBug();

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetBug();
      });
  }

  ngOnDestroy() {
    this.stopCrawling();

    if (this.directionTimer) {
      clearTimeout(this.directionTimer);
    }

    if (this.reportTimer) {
      clearTimeout(this.reportTimer);
    }

    if (this.splatTimer) {
      clearTimeout(this.splatTimer);
    }

    this.routerSubscription?.unsubscribe();
  }

  /**
   * 🐞 User catches the ladybug
   */
  catchBug() {
    // Don't allow another click while the bug is already crushed
    if (!this.isVisible()) return;

    // 💥 Remember exactly where the bug was crushed
    this.splatX.set(this.bugX());
    this.splatY.set(this.bugY());

    // 🎨 Pick a random crime-scene color
    const randomColor =
      this.splatColors[Math.floor(Math.random() * this.splatColors.length)];

    this.splatColor.set(randomColor);

    // 💥 Show the impact
    this.showSplat.set(true);

    // 🛑 Remove the bug
    this.isVisible.set(false);
    this.stopCrawling();

    if (this.directionTimer) {
      clearTimeout(this.directionTimer);
    }

    /*
     * 🧪 Show the report fairly quickly.
     *
     * The user gets a moment to see:
     *
     * 🐞 → 💥
     *
     * before the modal appears.
     */
    this.reportTimer = setTimeout(() => {
      this.showReport.set(true);
    }, 700);

    /*
     * 💥 Keep the colorful splat around a little longer.
     */
    this.splatTimer = setTimeout(() => {
      this.showSplat.set(false);
    }, 1500);
  }

  /**
   * Close the bug report.
   */
  closeReport() {
    this.showReport.set(false);
  }

  /**
   * Bring everything back when the user changes page.
   */
  private resetBug() {
    if (typeof window === 'undefined') return;

    // Cancel any pending timers from the previous page
    if (this.reportTimer) {
      clearTimeout(this.reportTimer);
    }

    if (this.splatTimer) {
      clearTimeout(this.splatTimer);
    }

    if (this.directionTimer) {
      clearTimeout(this.directionTimer);
    }

    this.showReport.set(false);
    this.showSplat.set(false);
    this.isVisible.set(true);

    this.x = window.innerWidth * (0.25 + Math.random() * 0.5);

    this.y = window.innerHeight * (0.25 + Math.random() * 0.5);

    this.angle = Math.random() * Math.PI * 2;

    this.targetAngle = this.angle;

    this.speed = 0.45;
    this.targetSpeed = 0.45;

    this.bugX.set(this.x);
    this.bugY.set(this.y);

    this.bugAngle.set((this.angle * 180) / Math.PI + 90);

    this.startCrawling();
  }

  private startBug() {
    this.x = window.innerWidth * 0.6;
    this.y = window.innerHeight * 0.5;

    this.bugX.set(this.x);
    this.bugY.set(this.y);

    this.chooseNewDirection();
    this.startCrawling();
  }

  private startCrawling() {
    this.stopCrawling();

    this.lastTime = performance.now();

    this.animationFrame = requestAnimationFrame((time) =>
      this.animateBug(time),
    );
  }

  private stopCrawling() {
    if (this.animationFrame !== undefined) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
  }

  private animateBug(time: number) {
    if (!this.isVisible() || this.showReport()) {
      return;
    }

    const delta = Math.min((time - this.lastTime) / 16.67, 2);

    this.lastTime = time;

    this.updateDirection();
    this.updateSpeed();

    this.x += Math.cos(this.angle) * this.speed * delta;

    this.y += Math.sin(this.angle) * this.speed * delta;

    this.handleEdges();

    this.bugX.set(this.x);
    this.bugY.set(this.y);

    const degrees = (this.angle * 180) / Math.PI + 90;

    this.bugAngle.set(degrees);

    this.animationFrame = requestAnimationFrame((nextTime) =>
      this.animateBug(nextTime),
    );
  }

  private chooseNewDirection() {
    const gentleTurn = (Math.random() - 0.5) * (Math.PI / 2);

    this.targetAngle = this.angle + gentleTurn;

    this.targetSpeed = 0.35 + Math.random() * 0.35;

    const delay = 1800 + Math.random() * 3000;

    this.directionTimer = setTimeout(() => {
      if (this.isVisible() && !this.showReport()) {
        this.chooseNewDirection();
      }
    }, delay);
  }

  private updateDirection() {
    let difference = this.targetAngle - this.angle;

    while (difference > Math.PI) {
      difference -= Math.PI * 2;
    }

    while (difference < -Math.PI) {
      difference += Math.PI * 2;
    }

    this.angle += difference * 0.02;
  }

  private updateSpeed() {
    const difference = this.targetSpeed - this.speed;

    this.speed += difference * 0.015;
  }

  private handleEdges() {
    const margin = 45;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.x < margin) {
      this.targetAngle = 0;
    }

    if (this.x > width - margin) {
      this.targetAngle = Math.PI;
    }

    if (this.y < margin) {
      this.targetAngle = Math.PI / 2;
    }

    if (this.y > height - margin) {
      this.targetAngle = -Math.PI / 2;
    }

    this.x = Math.max(margin, Math.min(width - margin, this.x));

    this.y = Math.max(margin, Math.min(height - margin, this.y));
  }
}
