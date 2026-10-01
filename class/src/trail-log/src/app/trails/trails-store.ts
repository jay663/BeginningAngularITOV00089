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
import { ApiCreate, ApiTrail, Trail } from './types';

type TrailsState = {
  favorites: string[];
};

const initialTrailsState: TrailsState = {
  favorites: [],
};

export const TrailsStore = signalStore(
  withProps(() => ({
    // go to whatever origin is serving this app, and get /api/trails get https://localhost:8080/api/trails
    trailsResource: httpResource<ApiTrail[]>(() => '/api/trails'),
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
    addTrail: async (trail: ApiCreate) => {
      await fetch('/api/trails', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(trail),
      });
      // it is always best to reload the state
      store.trailsResource.reload();
    },
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
