import { Component, computed, inject } from '@angular/core';
import { TrailCard } from './trail-card';
import { TrailStats } from './trail-stats';
import { TrailsPrefs } from './trails-prefs';
import { TrailsStore } from './trails-store';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trails-list',
  imports: [TrailStats, TrailCard, TrailsPrefs],
  template: `
    @if (store.trailsResource.isLoading()) {
      <div class="alert alert-info">
        <p>Getting your trails...hang tite!</p>
      </div>
      <span class="loading loading-spinner text-success"></span>
    } @else {
      <app-trails-prefs />
      <div class="flex flex-col md:flex-row gap-4 ">
        <app-trail-stats [trailList]="store.trails()"> </app-trail-stats>
        <div
          data-testid="trail-list"
          class="grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-4 w-fit gap-4"
        >
          @for (trail of store.trails(); track trail.name) {
            <app-trails-trail-card [trail]="trail" [attr.data-testid]="'item-' + $index" />
          } @empty {
            <p>No trails match your filters!</p>
          }
        </div>
      </div>
    }
    @if (store.trailsResource.error()) {
      <div class="alert alert-error">
        <p>There was an API error!</p>
        @let e = getError(store.trailsResource.error());
        <p>{{ e.status }}</p>
      </div>
    }
  `,
  styles: ``,
})
export class TrailList {
  protected readonly store = inject(TrailsStore);

  getError(e: unknown): HttpErrorResponse {
    return e as HttpErrorResponse;
  }
  theError = computed(() => {
    const err = this.store.trailsResource.error();
    if (err !== null) {
      return err as HttpErrorResponse;
    }
    return null;
  });
}
