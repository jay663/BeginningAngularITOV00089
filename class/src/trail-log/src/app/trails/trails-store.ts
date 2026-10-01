import { httpResource } from '@angular/common/http';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { withSortingAndFiltering } from './sorting-filtering-feature';
import { ApiTrail, Trail } from './types';

type TrailsState = {
  favorites: string[];
};

const initialTrailsState: TrailsState = {
  favorites: [],
};

export const TrailsStore = signalStore(
  withProps(() => ({
    // TODO: I *swear* I will fix this tomorrow- classroom crap - do not hard-code urls. duh.
    // httpResource was "experimental" until Angular 22 (I've been using it for about a year.)
    trailsResource: httpResource<ApiTrail[]>(() => 'http://localhost:1337/trails'),
  })),
  withState<TrailsState>(initialTrailsState), // here's the data I want to store in this "store"
  withSortingAndFiltering(),
  withComputed((store) => ({
    trails: computed(() => {
      const apiTrails = store.trailsResource.value() || [];
      const favorites = store.favorites();
      const filter = store.filter();
      const sortBy = store.sortBy();
      const sortOrder = store.sortOrder();
      const filteredTrails = apiTrails.filter((trail) => {
        if (filter === 'favorites') {
          return favorites.includes(trail.id);
        } else if (filter === 'non-favorites') {
          return !favorites.includes(trail.id);
        }
        return true;
      });
      const sortedTrails = filteredTrails.sort((a, b) => {
        if (sortBy === 'name') {
          return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === 'mileage') {
          return sortOrder === 'asc' ? a.miles - b.miles : b.miles - a.miles;
        }
        return 0;
      });
      return sortedTrails.map(
        (trail) =>
          ({
            ...trail,
            favorite: favorites.includes(trail.id),
          }) as Trail,
      );
    }),
  })),
  withMethods((store) => ({
    toggleFavorite: (trailId: string) => {
      const favorites = store.favorites();
      if (favorites.includes(trailId)) {
        patchState(store, { favorites: favorites.filter((id) => id !== trailId) });
      } else {
        patchState(store, { favorites: [...favorites, trailId] });
      }
    },
  })),
  withHooks({
    onInit(store) {
      // patchState(store, { _trails: FAKE_TRAILS });
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      patchState(store, { favorites: savedFavorites });

      watchState(store, (state) => {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      });
    },
  }),
);
