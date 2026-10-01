import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-display',
  imports: [],
  template: `
    <div class="stat-title text-accent">{{ label() }}</div>
    <div class="stat-value text-secondary sm:text-xs md:text-md lg:text-xl">{{ value() }}</div>
  `,
  host: {
    '[class]': '{stat: true}',
  },
  styles: ``,
})
export class StatDisplay {
  label = input.required<string>();
  value = input.required<string | string>();
}
