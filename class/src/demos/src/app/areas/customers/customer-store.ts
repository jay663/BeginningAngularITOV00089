import { signalState, signalStore, withComputed, withState } from '@ngrx/signals';
import { FAKE_CUSTOMERS } from './fake-customers';
import { withCustomerPrefs } from './customer-prefs-feature';
import { computed } from '@angular/core';

// overall customer related stuff.
export const CustomerStore = signalStore(
  withState({
    _customers: FAKE_CUSTOMERS,
  }),
  withCustomerPrefs(),
  withComputed((store) => {
    // a little seam to do things like inject services, etc. hint hint. (see: tomorrow)
    return {
      customers: computed(() => {
        const custs = store._customers();
        const sortKey = store.sortKey();
        if (sortKey === 'creditLimit') {
          return custs.toSorted((a, b) =>
            a.creditLimit > b.creditLimit ? 1 : a.creditLimit === b.creditLimit ? 0 : -1,
          );
        }
        if (sortKey === 'name') {
          return custs.toSorted((a, b) => a.name.last.localeCompare(b.name.last));
        }
        return custs;
      }),
    };
  }),
);
