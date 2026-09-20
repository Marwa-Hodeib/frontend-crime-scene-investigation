import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ux-crimes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ux-crimes.component.html',
})
export class UxCrimesComponent {
  // FORM

  attempts = 0;

  formData = {
    name: '',
    email: '',
    technology: '',
    agree: false,
  };

  // MODAL

  modalType = signal<'error' | 'hint' | 'success' | 'resolution' | null>(null);

  modalMessage = signal('');

  private hintIndex = 0;

  // WRONG BUTTON MESSAGES

  private buttonMessages = {
    save: [
      '❌ Wrong button. Your information has been saved. Unfortunately, that was not the objective.',
      '❌ You saved a draft. Congratulations on accomplishing something completely unrelated.',
      '❌ Still not Submit. The button is literally hiding from you.',
      '❌ At this point, the draft is probably safer than your patience.',
    ],

    cancel: [
      '❌ Cancel? Really? You came all this way to give up?',
      '❌ You just cancelled your investigation.',
      '❌ The suspect has escaped.',
      '❌ I am beginning to question your investigative abilities.',
    ],
  };

  // HINTS

  private hints = [
    "Look for a button that doesn't really look like a button. 👀",
    'You are looking for the word "submit". Maybe inspect the suspicious little things.',
    "It's near the bottom. I'm basically pointing at it without pointing at it. 😂",
  ];

  // INTERACTIONS

  onFakeButtonClick(button: 'save' | 'cancel') {
    this.attempts++;

    const messages = this.buttonMessages[button];
    const message = messages[Math.min(this.attempts - 1, messages.length - 1)];

    this.showModal('error', message);
  }

  fakeSubmit() {
    this.attempts++;

    const messages = [
      'Nope. That was just a word.',
      'You clicked "Submit" and submitted absolutely nothing.',
      'Very reasonable guess. Wrong, though.',
      'Stop trusting the word "Submit".',
    ];

    const message = messages[Math.min(this.attempts - 1, messages.length - 1)];

    this.showModal('error', message);
  }

  fakeCheckbox() {
    this.attempts++;

    this.showModal(
      'error',
      'You checked the box promising not to commit frontend crimes. Suspicious.',
    );
  }

  requestHint() {
    const hint = this.hints[Math.min(this.hintIndex, this.hints.length - 1)];

    this.showModal('hint', hint);

    this.hintIndex++;
  }

  onSubmit() {
    this.showModal('success');
  }

  openResolutionModal() {
    this.showModal('resolution');
  }

  // MODAL HELPERS

  private showModal(
    type: 'error' | 'hint' | 'success' | 'resolution',
    message = '',
  ) {
    this.modalMessage.set(message);
    this.modalType.set(type);
  }

  closeModal() {
    this.modalType.set(null);
    this.modalMessage.set('');
  }
}
