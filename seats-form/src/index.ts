import {CHILD_APP_INTERNAL_ROOT_STATE_ALLOWED_STORE_TOKEN, createChildApp} from '@tramvai/child-app-core';
import { RootCmp } from './components/root';
import {CommonChildAppModule} from "@tramvai/module-common";
import {provide} from "@tramvai/core";
import { MediaStore } from '@tramvai/module-client-hints';

// eslint-disable-next-line import/no-default-export
export default createChildApp({
  name: 'seats-form',
  render: RootCmp,
  modules: [CommonChildAppModule],
  providers: [
      provide({
    provide: CHILD_APP_INTERNAL_ROOT_STATE_ALLOWED_STORE_TOKEN,
    multi: true,
    // also you can use store string key, "media" for MediaStore
    useValue: [MediaStore],
  }),
  provide({
    provide: "HELLO_TOKEN",
    useValue: "hello"
  })
  ],
});
