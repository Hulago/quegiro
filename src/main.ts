/** Vuetify Vite */
import { createApp } from '@vue/composition-api';

import Vue from 'vue';

import './plugins/composition.plugin';
Vue.config.productionTip = false;

import { vuetify } from './plugins/vuetify.plugin';
import { RootContainer } from './containers/main';
import { router } from './plugins/router.plugin';
import { i18n } from './plugins/i18n.plugin';

import { useEnvironment } from './common';

import { store } from './store';

/**
 * It creates the Vue application, mounts it to the DOM, and then prints out some useful information to
 * the console
 */
async function main() {
  const { env } = useEnvironment<ImportMetaEnv>(import.meta.env);

  const app = createApp({
    i18n,
    render: h => h(RootContainer),
    router,
    store,
    vuetify
  });

  app.mount('#app');

  // await boot(app);

  if (!env.production) {
    console.groupCollapsed('APPLICATION VUE');
    console.dir(app);
    console.groupEnd();

    console.groupCollapsed('ENV');
    console.dir(env);
    console.groupEnd();

    console.groupCollapsed('ROUTES');
    console.table(router.getRoutes());
    console.groupEnd();
  }
}

main();
