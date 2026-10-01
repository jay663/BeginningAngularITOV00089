import { Component, inject } from '@angular/core';
import { CounterStore } from '../../../demos/counter-store';

@Component({
  selector: 'app-counting-prefs',
  imports: [],
  template: `
    <div class="join">
      <button
        [disabled]="store.by() === 1"
        (click)="store.setCountBy(1)"
        class="btn btn-info join-item"
      >
        1
      </button>
      <button
        [disabled]="store.by() === 3"
        (click)="store.setCountBy(3)"
        class="btn btn-info join-item"
      >
        3
      </button>
      <button
        [disabled]="store.by() === 5"
        (click)="store.setCountBy(5)"
        class="btn btn-info join-item"
      >
        5
      </button>
    </div>
  `,
  styles: ``,
})
export class Prefs {
  store = inject(CounterStore);
}
