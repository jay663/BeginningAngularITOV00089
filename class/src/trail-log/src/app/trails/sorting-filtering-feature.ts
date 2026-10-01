import { effect, inject } from '@angular/core';
import { Params, Router } from '@angular/router';
import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

const sortByOptions = ['name', 'mileage'] as const;
const sortOrderOptions = ['asc', 'desc'] as const;
const filterOptions = ['all', 'favorites', 'non-favorites'] as const;

type SortingAndFilteringState = {
  sortBy: (typeof sortByOptions)[number];
  sortOrder: (typeof sortOrderOptions)[number];
  filter: (typeof filterOptions)[number];
};

type SortByOption = SortingAndFilteringState['sortBy'];
type SortOrderOption = SortingAndFilteringState['sortOrder'];
type FilterOption = SortingAndFilteringState['filter'];

export function withSortingAndFiltering() {
  return signalStoreFeature(
    withState<SortingAndFilteringState>({
      sortBy: 'name',
      sortOrder: 'asc',
      filter: 'all',
    }),
    withProps(() => ({
      _router: inject(Router),
    })),
    withMethods((store) => {
      // "injection context"
      const router = inject(Router);
      return {
        setSortBy: (sortBy: SortByOption) => {
          // update the query string parameters - this is important "state"
          router.navigate([], { queryParams: { sortBy: sortBy }, queryParamsHandling: 'merge' });
          // update the state in teh store.
          patchState(store, { sortBy: sortBy });
        },
        setSortOrder: (sortOrder: SortOrderOption) => {
          router.navigate([], {
            queryParams: { sortOrder: sortOrder },
            queryParamsHandling: 'merge',
          });
          patchState(store, { sortOrder: sortOrder });
        },
        setFilter: (filter: FilterOption) => {
          router.navigate([], { queryParams: { filter: filter }, queryParamsHandling: 'merge' });
          patchState(store, { filter: filter });
        },
        _updateQueryParams: (queryParams: Params) => {
          if (queryParams['sortBy'] && sortByOptions.includes(queryParams['sortBy'])) {
            patchState(store, { sortBy: queryParams['sortBy'] });
          }
          if (queryParams['sortOrder'] && sortOrderOptions.includes(queryParams['sortOrder'])) {
            patchState(store, { sortOrder: queryParams['sortOrder'] });
          }
          if (queryParams['filter'] && filterOptions.includes(queryParams['filter'])) {
            patchState(store, { filter: queryParams['filter'] });
          }
        },
      };
    }),
    withHooks({
      onInit(store) {
        effect(() => {
          // yesterday I subscribed to an observable, had to (but didn't) unsubscribe,etc.
          // in Angular 21.2 (?) they added a "currentNavigation()" method that returns a SIGNAL - no longer
          // need an observable.
          const cn = store._router.currentNavigation();
          if (cn?.initialUrl?.queryParams) {
            store._updateQueryParams(cn.initialUrl.queryParams);
          }
        });
      },
    }),
  );
}
