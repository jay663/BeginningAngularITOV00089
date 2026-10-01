import { Component, inject, OnDestroy, signal } from '@angular/core';
import { Counter } from '../demos/counter';
import { CounterStore } from '../demos/counter-store';

@Component({
  selector: 'app-counter-demo-page',
  imports: [Counter],
  providers: [],
  template: ` <app-counter /> `,
  styles: ``,
})
export class CounterDemo {
  msg = signal('Another');
  store = inject(CounterStore);
}
