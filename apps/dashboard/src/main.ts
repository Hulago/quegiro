/* eslint-disable no-console */
import 'vuetify/dist/vuetify.min.css';
import '@quegiro/dashboard/plugins/composition.plugin';

import { useEnvironment } from '@quegiro/common';
import { i18n } from '@quegiro/dashboard/plugins/i18n.plugin';
import { router } from '@quegiro/dashboard/plugins/router.plugin';
import { vuetify } from '@quegiro/dashboard/plugins/vuetify.plugin';
import { store } from '@quegiro/dashboard/store';
import { RootContainer } from '@quegiro/main-containers';
import { h } from '@vue/composition-api';
import Vue from 'vue';

// import { boot } from './plugins/boot.plugin';

Vue.config.productionTip = false;
Vue.config.silent = true;

async function main() {
  const { env } = useEnvironment<ImportMetaEnv>(import.meta.env);

  const app = new Vue({
    i18n,
    router,
    setup(props, { attrs, ...rest }) {
      return () =>
        h(RootContainer, {
          attrs: { ...attrs },
          props,
          ...rest
        });
    },
    store,
    vuetify
  });

  // await boot(app);

  app.$mount('#app');

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
