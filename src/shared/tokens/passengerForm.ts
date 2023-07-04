import { createToken } from '@tinkoff/dippy';
import type { useSyncExternalStore } from 'react';
import toArray from '@tinkoff/utils/array/toArray';
// import pick from '@tinkoff/utils/object/pick';
import type { STORE_TOKEN } from '@tramvai/module-common';
import type { Reducer } from '@tramvai/state';
import identity from '@tinkoff/utils/function/identity';

type ArgsType = Parameters<typeof useSyncExternalStore>;

type DataType = {
  subscribe: ArgsType[0];
  getSnapshot: ArgsType[1];
};

type InferStoreStateFromReducer<Store extends Reducer<any>> =
  Store extends Reducer<infer State> ? State : any;

type StoreType<S = any, N extends string = string> = Reducer<S, N>;

export class Sample<T> {
  private subscribeContainer = {
    subscribe: () => {},
    getSnapshot: () => {},
  } as DataType;

  constructor() {}

  getSubscribe() {
    return this.subscribeContainer;
  }

  setSubscribe<R extends StoreType>(
    storesOrStore: R,
    appStore: typeof STORE_TOKEN,
    selector: (state: {
      [key in R['storeName']]: InferStoreStateFromReducer<R>;
    }) => T = identity
  ) {
    this.subscribeContainer = {
      subscribe: (cb) => {
        const resultStores = toArray(storesOrStore);
        const unsubscribers = new Array(resultStores.length);

        for (let i = 0; i < resultStores.length; i++) {
          unsubscribers[i] = appStore.subscribe(resultStores[i], cb);
        }

        return () => {
          unsubscribers.forEach((unsubscribe) => unsubscribe());
        };
      },
      getSnapshot: () => {
        // getSnapshot должен отдавать мемоизированный результат между рендерами. Не знаю как сделать иммутабельные преобразования над объектом,
        // поэтому закомментил
        // const resultStores = toArray(storesOrStore);
        //
        // const storeNames = resultStores.map((store) => store.storeName);
        //
        // const resultState = pick(storeNames, appStore.getState()) as {
        //   [key in R['storeName']]: InferStoreStateFromReducer<R>;
        // };

        return selector(appStore.getState());
      },
    };
  }
}

export const PASSENGER_FORM_DATA = createToken<Sample<string>>(
  'PASSENGER_FORM_DATA'
);
