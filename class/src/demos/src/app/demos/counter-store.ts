import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

// state - currrent, by
// methods - increment, decrement
// computed - is it even?
type CountByValues = 1 | 3 | 5;
type CounterState = {
  current: number;
  by: CountByValues;
};

// higher-order functions - any function that takes a function as an argument and/or returns a function
// customers.Where(c => c.CreditLimit > 5000M);
export const CounterStore = signalStore(
  withState<CounterState>({
    current: 0,
    by: 1,
  }),
  withMethods((store) => {
    return {
      increment: () => patchState(store, { current: store.current() + store.by() }),
      decrement: () => patchState(store, { current: store.current() - store.by() }),
      setCountBy: (by: CountByValues) => patchState(store, { by }),
    };
  }),
);
