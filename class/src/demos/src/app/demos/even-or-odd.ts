import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-even-or-odd',
  imports: [],
  template: `
    <button class="btn btn-ghost" (click)="letMommaKnow()">
      @if (isCurrentlyEven()) {
        <p>{{ evenMessage() }}</p>
      } @else {
        <p>{{ oddMessage() }}</p>
      }
    </button>
  `,
  styles: ``,
})
export class EvenOrOdd {
  isCurrentlyEven = input.required<boolean>();
  evenMessage = input('That is Even!');
  oddMessage = input('That is Odd!');
  theyClicked = output();

  letMommaKnow() {
    this.theyClicked.emit();
  }
}
