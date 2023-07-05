import { createReducer, createEvent } from '@tramvai/state';

export const setAnotherValue = createEvent('setAnother');

export const PassengerStore = createReducer('passenger', 0)
    .on(setAnotherValue, (state) => state +1 );