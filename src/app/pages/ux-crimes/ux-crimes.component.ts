import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ux-crimes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ux-crimes.component.html',
})
export class UxCrimesComponent {
  submitted = false;

  attempts = 0;
  hintLevel = 0;

  formData = {
    name: '',
    email: '',
    technology: '',
    agree: false,
  };

  wrongButtonMessage = '';

  onFakeButtonClick(button: string) {
    this.attempts++;

    if (button === 'save') {
      this.wrongButtonMessage = this.getSaveMessage();
    }

    if (button === 'cancel') {
      this.wrongButtonMessage = this.getCancelMessage();
    }
  }

  getSaveMessage(): string {
    const messages = [
      '❌ Wrong button. Your information has been saved. Unfortunately, that was not the objective.',
      '❌ You saved a draft. Congratulations on accomplishing something completely unrelated.',
      '❌ Still not Submit. The button is literally hiding from you.',
      '❌ At this point, the draft is probably safer than your patience.',
    ];

    return messages[Math.min(this.attempts - 1, messages.length - 1)];
  }

  getCancelMessage(): string {
    const messages = [
      '❌ Cancel? Really? You came all this way to give up?',
      '❌ You just cancelled your investigation.',
      '❌ The suspect has escaped.',
      '❌ I am beginning to question your investigative abilities.',
    ];

    return messages[Math.min(this.attempts - 1, messages.length - 1)];
  }

  requestHint() {
    this.hintLevel++;

    if (this.hintLevel === 1) {
      this.wrongButtonMessage =
        '💡 Hint #1: The button exists. Somewhere. Probably.';
    } else if (this.hintLevel === 2) {
      this.wrongButtonMessage =
        '💡 Hint #2: Look somewhere a button normally should NOT be.';
    } else {
      this.wrongButtonMessage =
        '💡 Hint #3: Look near the bottom-right corner. Yes, really.';
    }
  }

  onSubmit() {
    this.submitted = true;
  }
  submitClickCount = 0;

  fakeSubmit() {
    this.submitClickCount++;

    const messages = [
      '❌ Nope. That was just a word.',
      '❌ You clicked "Submit" and submitted absolutely nothing.',
      '❌ Very reasonable guess. Wrong, though.',
      '❌ Congratulations. You have submitted... nothing.',
      '❌ Stop trusting the word "Submit".',
      '❌ The real button is somewhere. Good luck.',
    ];

    this.wrongButtonMessage =
      messages[Math.min(this.submitClickCount - 1, messages.length - 1)];

    this.attempts++;
  }

  fakeCheckbox() {
    this.attempts++;

    this.wrongButtonMessage =
      '🚨 CRIME DETECTED. You checked the box promising not to commit frontend crimes. Suspicious.';
  }
}
