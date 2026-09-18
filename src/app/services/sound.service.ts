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

  // 🟡 Pick up the number
  click() {
    const context = this.getAudioContext();

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'square';

    oscillator.frequency.setValueAtTime(520, context.currentTime);

    gain.gain.setValueAtTime(0.06, context.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.08);
  }

  // 🟣 Transform the number
  whoosh() {
    const context = this.getAudioContext();

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'square';

    oscillator.frequency.setValueAtTime(220, context.currentTime);

    oscillator.frequency.exponentialRampToValueAtTime(
      880,
      context.currentTime + 0.22,
    );

    gain.gain.setValueAtTime(0.04, context.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.22);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.22);
  }

  // 🟢 Result appears
  ding() {
    const context = this.getAudioContext();

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'square';

    oscillator.frequency.setValueAtTime(660, context.currentTime);

    oscillator.frequency.exponentialRampToValueAtTime(
      990,
      context.currentTime + 0.12,
    );

    gain.gain.setValueAtTime(0.06, context.currentTime);

    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.18);
  }
}
