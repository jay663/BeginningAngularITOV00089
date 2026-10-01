import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { FAKE_TRAILS } from './fake-data';
import { ApiTrail, Trail } from './types';
import { computed } from '@angular/core';

type TrailsState = {
  _trails: ApiTrail[];
  favorites: string[];
};

const initialTrailsState: TrailsState = {
  _trails: [],
  favorites: [],
};

export const TrailsStore = signalStore(
  withState<TrailsState>(initialTrailsState), // here's the data I want to store in this "store"
  withComputed((store) => ({
    // these are computed values based on data in the store.
    trails: computed(() => {
      const apiTrails = store._trails();
      const favorites = store.favorites();
      // map - given an array of x length returns a new array of x length [1,2] => (n) => n + n => [2,4]
      return apiTrails.map(
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
      patchState(store, { _trails: FAKE_TRAILS });
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      patchState(store, { favorites: savedFavorites });

      watchState(store, (state) => {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      });
    },
  }),
);
