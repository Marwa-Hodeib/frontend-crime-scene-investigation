import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private audioContext: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    return this.audioContext;
  }

  click() {
    const context = this.getAudioContext();

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';

    oscillator.frequency.setValueAtTime(500, context.currentTime);

    gain.gain.setValueAtTime(0.08, context.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.08);
  }

  whoosh() {
    const context = this.getAudioContext();

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';

    oscillator.frequency.setValueAtTime(180, context.currentTime);

    oscillator.frequency.exponentialRampToValueAtTime(
      700,
      context.currentTime + 0.25,
    );

    gain.gain.setValueAtTime(0.06, context.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.25);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.25);
  }

  ding() {
    const context = this.getAudioContext();

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';

    oscillator.frequency.setValueAtTime(700, context.currentTime);

    oscillator.frequency.exponentialRampToValueAtTime(
      1000,
      context.currentTime + 0.15,
    );

    gain.gain.setValueAtTime(0.08, context.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.2);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.2);
  }
}
