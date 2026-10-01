import { Component } from '@angular/core';
import { Counter } from '../../../demos/counter';

@Component({
  selector: 'app-counting-counter',
  imports: [Counter],
  template: ` <app-counter /> `,
  styles: ``,
})
export class CounterPage {}
