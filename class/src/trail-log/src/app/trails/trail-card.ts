import { TitleCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Trail } from './types';
import { WithDifficultyDirective } from './with-difficulty';
import { TrailsStore } from './trails-store';
import { StatDisplay } from '../widgets/stat-display';

@Component({
  selector: 'app-trails-trail-card',
  imports: [TitleCasePipe, WithDifficultyDirective, StatDisplay],
  template: `
    <div class="card-body">
      <h2 class="card-title text-secondary">{{ trail().name }}</h2>
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <app-stat-display label="Miles" [value]="trail().miles.toString()" />

        <div class="stat">
          <div class="stat-title">Level</div>
          <div class="stat-value">
            <span class="text-lg md:text-xl lg:text-2xl" [appWithDifficulty]="trail().difficulty">{{
              trail().difficulty | titlecase
            }}</span>
          </div>
        </div>
      </div>
      <div class="card-actions justify-end">
        <label
          [class]="{ 'text-success': trail().favorite, 'text-neutral': trail().favorite === false }"
          class="label"
        >
          {{ trail().favorite ? 'Favorite!' : 'Mark as Favorite' }}
          <input
            type="checkbox"
            [checked]="trail().favorite"
            (change)="toggleFavorite()"
            class="toggle toggle-sm"
          />
        </label>
      </div>
    </div>
  `,

  styleUrl: './trail-card.css',
  host: {
    '[class.ring-4]': 'trail().favorite',
    '[class.ring-success]': 'trail().favorite',
  },
})
export class TrailCard {
  protected readonly store = inject(TrailsStore);
  readonly trail = input.required<Trail>();

  protected toggleFavorite() {
    this.store.toggleFavorite(this.trail().id);
  }
}
