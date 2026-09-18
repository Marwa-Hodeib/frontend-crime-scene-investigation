import { Component, signal } from '@angular/core';
import { SoundService } from '../../services/sound.service';

type MapOperation = 'double' | 'addTen' | 'multiplyFive' | 'square';

@Component({
  selector: 'app-javascript-crimes',
  standalone: true,
  imports: [],
  templateUrl: './javascript-crimes.component.html',
  styleUrl: './javascript-crimes.component.scss',
})
export class JavascriptCrimesComponent {
  numbers = [1, 2, 3, 4];
  mappedNumbers = signal<number[]>([]);
  activeOperation = signal<MapOperation>('double');
  isRunning = signal(false);
  currentIndex = signal(-1);
  soundEnabled = signal(true);
  animationStage = signal<'idle' | 'input' | 'transform' | 'return'>('idle');

  toggleSound() {
    this.soundEnabled.update((enabled) => !enabled);
  }
  operations: {
    id: MapOperation;
    label: string;
  }[] = [
    {
      id: 'double',
      label: '× 2',
    },
    {
      id: 'addTen',
      label: '+ 10',
    },
    {
      id: 'multiplyFive',
      label: '× 5',
    },
    {
      id: 'square',
      label: 'Square',
    },
  ];

  selectOperation(operation: MapOperation) {
    if (this.isRunning()) {
      return;
    }

    this.activeOperation.set(operation);
    this.mappedNumbers.set([]);
    this.currentIndex.set(-1);
  }

  runMap() {
    if (this.isRunning()) {
      return;
    }

    this.isRunning.set(true);
    this.mappedNumbers.set([]);
    this.currentIndex.set(-1);
    this.animationStage.set('idle');

    let index = 0;

    const processNext = () => {
      if (index >= this.numbers.length) {
        this.currentIndex.set(-1);
        this.animationStage.set('idle');
        this.isRunning.set(false);
        return;
      }

      this.currentIndex.set(index);

      // STEP 1 — pick up the current item
      this.animationStage.set('input');

      if (this.soundEnabled()) {
        this.sound.click();
      }

      setTimeout(() => {
        // STEP 2 — transform the item
        this.animationStage.set('transform');

        if (this.soundEnabled()) {
          this.sound.whoosh();
        }

        const result = this.transform(this.numbers[index]);

        setTimeout(() => {
          // STEP 3 — return the result
          this.animationStage.set('return');

          if (this.soundEnabled()) {
            this.sound.ding();
          }

          this.mappedNumbers.update((values) => [...values, result]);

          index++;

          setTimeout(() => {
            processNext();
          }, 800);
        }, 900);
      }, 1000);
    };

    processNext();
  }
  private transform(value: number): number {
    switch (this.activeOperation()) {
      case 'double':
        return value * 2;

      case 'addTen':
        return value + 10;

      case 'multiplyFive':
        return value * 5;

      case 'square':
        return value * value;
    }
  }

  getCodeBefore(): string {
    return 'numbers.map(';
  }

  getCodeAfter(): string {
    switch (this.activeOperation()) {
      case 'double':
        return ' => number * 2)';

      case 'addTen':
        return ' => number + 10)';

      case 'multiplyFive':
        return ' => number * 5)';

      case 'square':
        return ' => number * number)';
    }
  }

  getOperationDescription(): string {
    switch (this.activeOperation()) {
      case 'double':
        return 'Take each number and multiply it by 2.';

      case 'addTen':
        return 'Take each number and add 10 to it.';

      case 'multiplyFive':
        return 'Take each number and multiply it by 5.';

      case 'square':
        return 'Take each number and multiply it by itself.';
    }
  }

  constructor(private sound: SoundService) {}
}
