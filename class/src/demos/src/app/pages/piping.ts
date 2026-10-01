import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SsnHiderPipe } from '../demos/ssn-pipe';

@Component({
  selector: 'app-piping-page',
  imports: [DatePipe, SsnHiderPipe],
  template: `
    <p>pipe stuff</p>
    <p>SSN: {{ myFakeSsn() | ssnHider }}</p>
    <p>Today is {{ today() | date: 'fullDate' }} at {{ today() | date: 'longTime' }}</p>
  `,
  styles: ``,
})
export class Piping {
  protected readonly today = signal(new Date());

  protected myFakeSsn = signal('555-66-7777');
}
