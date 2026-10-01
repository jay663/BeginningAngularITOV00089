import { Component, inject } from '@angular/core';
import { TrailCard } from './trail-card';
import { TrailStats } from './trail-stats';
import { TrailsPrefs } from './trails-prefs';
import { TrailsStore } from './trails-store';

@Component({
  selector: 'app-trails-list',
  imports: [TrailStats, TrailCard, TrailsPrefs],
  template: `
    <app-trails-prefs />
    @if (store.trailsResource.isLoading()) {
      <div class="alert alert-info">
        <p>Getting your trails...hang tite!</p>
      </div>
    } @else {
      <div class="flex flex-col md:flex-row gap-4 ">
        <app-trail-stats [trailList]="store.trails()"> </app-trail-stats>
        <div class="grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-4 w-fit gap-4">
          @for (trail of store.trails(); track trail.name) {
            <app-trails-trail-card [trail]="trail" />
          } @empty {
            <p>No trails match your filters!</p>
          }
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class TrailList {
  protected readonly store = inject(TrailsStore);
}
