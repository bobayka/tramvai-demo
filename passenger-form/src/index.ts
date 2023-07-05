import { createChildApp } from '@tramvai/child-app-core';
import { RootCmp } from './components/root';
import {COMBINE_REDUCERS, CommonChildAppModule} from "@tramvai/module-common";
import {PassengerStore} from "./stores/PassengerStore/passengerStore";
import {provide} from "@tramvai/core";

// eslint-disable-next-line import/no-default-export
export default createChildApp({
  name: 'passenger-form',
  render: RootCmp,
  modules: [CommonChildAppModule],
  providers: [
    provide({
      provide: COMBINE_REDUCERS,
      multi: true,
      useValue: [PassengerStore],
    })
  ],
});
