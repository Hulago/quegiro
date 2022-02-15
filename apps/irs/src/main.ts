/* eslint-disable no-console */
import 'vuetify/dist/vuetify.min.css';
import '@quegiro/irs/plugins/composition.plugin';
import '@quegiro/irs/plugins/graph.plugin';
import '@quegiro/irs/plugins/services.plugin';
import '@quegiro/irs/plugins/kit.plugin';

import { useEnvironment } from '@quegiro/common';
import { boot } from '@quegiro/irs/plugins/boot.plugin';
import { i18n } from '@quegiro/irs/plugins/i18n.plugin';
import { router } from '@quegiro/irs/plugins/router.plugin';
import { vuetify } from '@quegiro/irs/plugins/vuetify.plugin';
import { store } from '@quegiro/irs/store';
import { h } from '@vue/composition-api';
import Vue from 'vue';

Vue.config.productionTip = false;
Vue.config.silent = true;

async function main() {
  const { env } = useEnvironment<ImportMetaEnv>(import.meta.env);

  const app = new Vue({
    i18n,
    router,
    setup(props, { attrs, ...rest }) {
      return () =>
        h(PkRoot, {
          attrs: { ...attrs },
          props,
          ...rest
        });
    },
    store,
    vuetify
  });

  await boot(app);

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
