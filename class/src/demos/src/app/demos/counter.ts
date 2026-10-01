import { Component, inject } from '@angular/core';
import { CounterButtonDirective } from '../ui-widgets/counter-button';
import { CounterStore } from './counter-store';

@Component({
  selector: 'app-counter',
  imports: [CounterButtonDirective],
  providers: [],
  template: `
    <button (click)="store.decrement()" appCounterButton="decrement">-</button>
    <p>Current count is {{ store.current() }}</p>
    <button (click)="store.increment()" appCounterButton="increment">+</button>
  `,
  styles: ``,
})
export class Counter {
  store = inject(CounterStore);
}
