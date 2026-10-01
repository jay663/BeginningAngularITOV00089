import { Component, inject } from '@angular/core';
import { TrailsStore } from './trails-store';

@Component({
  selector: 'app-trails-prefs',
  imports: [],
  template: `
    <div class="flex flex-row gap-8 p-4">
      <div class="flex flex-row join mr-12">
        <button
          (click)="store.setFilter('all')"
          [disabled]="store.filter() === 'all'"
          class="btn btn-soft join-item"
        >
          Show All
        </button>
        <button
          (click)="store.setFilter('favorites')"
          [disabled]="store.filter() === 'favorites'"
          class="btn btn-soft join-item"
        >
          Only Favorites
        </button>
        <button
          (click)="store.setFilter('non-favorites')"
          [disabled]="store.filter() === 'non-favorites'"
          class="btn btn-soft join-item"
        >
          Only Non-Favorites
        </button>
      </div>
      <div class="flex flex-row join">
        <button
          (click)="store.setSortBy('name')"
          [disabled]="store.sortBy() === 'name'"
          class="btn btn-soft join-item"
        >
          Sort by Name
        </button>
        <button
          (click)="store.setSortBy('mileage')"
          [disabled]="store.sortBy() === 'mileage'"
          class="btn btn-soft join-item"
        >
          Sort by Mileage
        </button>
      </div>
      <div class="flex flex-row join">
        <button
          (click)="store.setSortOrder('asc')"
          [disabled]="store.sortOrder() === 'asc'"
          class="btn btn-soft join-item"
        >
          Asc
        </button>
        <button
          (click)="store.setSortOrder('desc')"
          [disabled]="store.sortOrder() === 'desc'"
          class="btn btn-soft join-item"
        >
          Desc
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class TrailsPrefs {
  protected readonly store = inject(TrailsStore);
}
