import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';

// all the stuff that has to do with sorting, filtering, etc. of customers would go here.
export function withCustomerPrefs() {
  return signalStoreFeature(
    withState({
      sortKey: 'name' as 'name' | 'creditLimit',
    }),
    withMethods((store) => {
      return {
        sortByName: () => patchState(store, { sortKey: 'name' }),
        sortByCreditLimit: () => patchState(store, { sortKey: 'creditLimit' }),
      };
    }),
  );
}
