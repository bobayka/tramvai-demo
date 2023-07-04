import { createApp, provide } from '@tramvai/core';
import { CommonModule, STORE_TOKEN } from '@tramvai/module-common';
import { SpaRouterModule } from '@tramvai/module-router';
import { RenderModule } from '@tramvai/module-render';
import { ServerModule } from '@tramvai/module-server';
import { ErrorInterceptorModule } from '@tramvai/module-error-interceptor';
import { SeoModule } from '@tramvai/module-seo';
import {
  RENDER_SLOTS,
  ResourceType,
  ResourceSlot,
} from '@tramvai/tokens-render';
import { HeaderModule } from '~shared/header';
import {
  CHILD_APP_RESOLUTION_CONFIGS_TOKEN,
  ChildAppModule,
} from '@tramvai/module-child-app';
import { PASSENGER_FORM_DATA, Sample } from '~shared/tokens/passengerForm';

createApp({
  name: 'tramvai-sandbox',
  modules: [
    CommonModule,
    SpaRouterModule,
    RenderModule.forRoot({ useStrictMode: true }),
    SeoModule,
    ServerModule,
    ErrorInterceptorModule,
    HeaderModule,
    ChildAppModule,
  ],
  providers: [
    {
      provide: RENDER_SLOTS,
      multi: true,
      useValue: {
        type: ResourceType.asIs,
        slot: ResourceSlot.HEAD_META,
        payload:
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
      },
    },
    provide({
      provide: CHILD_APP_RESOLUTION_CONFIGS_TOKEN,
      useValue: [
        {
          // name of the child-app
          name: 'seats-form',
          byTag: {
            latest: {
              // current version for the child app for tag `latest`
              version: '1.0.0',
              // remove this property if you already add CSS for this Child App
              withoutCss: true,
            },
          },
        },
        {
          // name of the child-app
          name: 'passenger-form',
          byTag: {
            latest: {
              // current version for the child app for tag `latest`
              version: '1.0.0',
              // remove this property if you already add CSS for this Child App
              withoutCss: true,
            },
          },
        },
      ],
    }),
    provide({
      provide: PASSENGER_FORM_DATA,
      useFactory: () => new Sample(),
    }),
  ],
});
