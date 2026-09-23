import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface RevealPixel {
  x: number;
  y: number;
  size: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  isRevealed = signal(false);

  escapeCount = signal(0);

  // 🐞 Three catches instead of four
  readonly maxEscapes = 3;

  showSpeech = signal(false);
  speechMessage = signal('');

  private speechTimer?: ReturnType<typeof setTimeout>;
  private captureTimer?: ReturnType<typeof setTimeout>;
  private pixelTimer?: ReturnType<typeof setTimeout>;

  private readonly speechMessages = [
    'HEY! You almost had me.',
    'STOP CHASING ME.',
    '...fine. You caught me.',
  ];

  bugX = signal(500);
  bugY = signal(300);
  bugAngle = signal(0);

  revealedPixels = signal<RevealPixel[]>([]);

  private animationFrame?: number;
  private directionTimer?: ReturnType<typeof setTimeout>;

  private x = 500;
  private y = 300;
  private angle = 0;
  private targetAngle = 0;

  private speed = 0.8;
  private targetSpeed = 0.8;

  private lastTime = 0;

  ngOnInit() {
    if (typeof window === 'undefined') return;

    this.x = window.innerWidth * 0.5;
    this.y = window.innerHeight * 0.35;

    this.bugX.set(this.x);
    this.bugY.set(this.y);

    this.createRevealPixel();
    this.chooseNewDirection();
    this.startCrawling();
    this.schedulePixel();
  }

  ngOnDestroy() {
    this.stopCrawling();

    if (this.directionTimer) clearTimeout(this.directionTimer);
    if (this.pixelTimer) clearTimeout(this.pixelTimer);
    if (this.captureTimer) clearTimeout(this.captureTimer);
    if (this.speechTimer) clearTimeout(this.speechTimer);
  }

  catchBug() {
    const clickNumber = this.escapeCount() + 1;

    this.escapeCount.set(clickNumber);

    this.speechMessage.set(this.speechMessages[clickNumber - 1]);

    this.showSpeech.set(true);

    if (this.speechTimer) {
      clearTimeout(this.speechTimer);
    }

    // 🐞 Third catch = captured
    if (clickNumber >= this.maxEscapes) {
      this.escapeBug(true);
      return;
    }

    this.escapeBug(false);

    this.speechTimer = setTimeout(() => {
      this.showSpeech.set(false);
    }, 1200);
  }

  /**
   * 🏛️ Skip the investigation and enter the museum.
   */
  openMuseum() {
    if (this.isRevealed()) return;

    if (this.speechTimer) {
      clearTimeout(this.speechTimer);
    }

    if (this.captureTimer) {
      clearTimeout(this.captureTimer);
    }

    this.showSpeech.set(false);
    this.stopCrawling();

    this.isRevealed.set(true);
  }

  get suspectStatus(): string {
    switch (this.escapeCount()) {
      case 0:
        return 'AT LARGE';

      case 1:
        return 'RESISTING ARREST';

      case 2:
        return 'CORNERED';

      default:
        return 'CONTAINED';
    }
  }

  get escapesRemaining(): number {
    return Math.max(this.maxEscapes - this.escapeCount(), 0);
  }

  private startCrawling() {
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
    if (this.isRevealed()) return;

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

    this.targetSpeed = 0.55 + Math.random() * 0.5;

    const delay = 1200 + Math.random() * 2200;

    this.directionTimer = setTimeout(() => {
      if (!this.isRevealed()) {
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

    this.angle += difference * 0.025;
  }

  private updateSpeed() {
    const difference = this.targetSpeed - this.speed;

    this.speed += difference * 0.02;
  }

  private escapeBug(isFinalEscape: boolean) {
    const turnDirection = Math.random() > 0.5 ? 1 : -1;

    const escapeTurn =
      turnDirection * (Math.PI / 2 + Math.random() * (Math.PI / 2));

    this.targetAngle = this.angle + escapeTurn;

    this.targetSpeed = isFinalEscape ? 0 : 1.5;

    if (isFinalEscape) {
      this.stopCrawling();

      this.captureTimer = setTimeout(() => {
        this.isRevealed.set(true);
      }, 700);
    } else {
      setTimeout(() => {
        if (!this.isRevealed()) {
          this.targetSpeed = 0.55 + Math.random() * 0.5;
        }
      }, 500);
    }
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

  private schedulePixel() {
    if (this.isRevealed()) return;

    this.pixelTimer = setTimeout(() => {
      if (!this.isRevealed()) {
        this.createRevealPixel();
        this.schedulePixel();
      }
    }, 45);
  }

  private createRevealPixel() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const percentX = (this.x / width) * 100;

    const percentY = (this.y / height) * 100;

    this.revealedPixels.update((pixels) => [
      ...pixels,
      {
        x: percentX,
        y: percentY,
        size: 0.9 + Math.random() * 0.6,
      },
    ]);
  }
}
