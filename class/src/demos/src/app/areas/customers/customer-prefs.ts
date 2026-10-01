import { Component, inject } from '@angular/core';
import { CustomerStore } from './customer-store';

@Component({
  selector: 'app-customer-prefs',
  imports: [],
  template: `
    <div class="flex flex-row gap-4">
      <div class="flex join">
        <button
          (click)="store.sortByName()"
          [disabled]="store.sortKey() === 'name'"
          class="btn btn-soft join-item"
        >
          Sort by Name
        </button>
        <button
          (click)="store.sortByCreditLimit()"
          [disabled]="store.sortKey() === 'creditLimit'"
          class="btn btn-soft join-item"
        >
          Sort by Credit Limit
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class CustomerPrefs {
  protected readonly store = inject(CustomerStore);
}
