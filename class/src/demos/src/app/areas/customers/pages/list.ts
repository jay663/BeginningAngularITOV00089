import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CustomerPrefs } from '../customer-prefs';
import { CustomerStore } from '../customer-store';

@Component({
  selector: 'app-customers-list',
  imports: [CurrencyPipe, CustomerPrefs],
  template: `
    <p>Customer List</p>

    <app-customer-prefs />
    <ul>
      @for (cust of store.customers(); track cust.id; let isEven = $even) {
        <li
          class="flex flex-row gap-2  m-4 p-2"
          [class.bg-base-300]="isEven"
          [class.bg-base-200]="!isEven"
        >
          <span>{{ $index + 1 }}</span>
          <span>{{ cust.name.first }} {{ cust.name.last }}</span>
          <span>Credit Limit {{ cust.creditLimit | currency }}</span>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class List {
  protected readonly store = inject(CustomerStore);
}
