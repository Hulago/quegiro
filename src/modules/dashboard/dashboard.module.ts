/* eslint-disable no-console */
import 'vuetify/dist/vuetify.min.css';
import './plugins/composition.plugin';

import { RootContainer } from '@quegiro/main-containers';
import { vuetify } from './plugins/vuetify.plugin';
import { router } from './plugins/router.plugin';
import { useEnvironment } from '@quegiro/common';
import { i18n } from './plugins/i18n.plugin';
import { h } from '@vue/composition-api';
import { store } from './store';
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
