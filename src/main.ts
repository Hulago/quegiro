import { useEnvironment } from '@/next';
import { createApp } from 'vue';

import 'element-plus/dist/index.css';
import '~/styles/index.scss';

import 'uno.css';

import 'element-plus/theme-chalk/src/message.scss';

import { router } from './plugins/router.plugin';

import AppPage from './pages/app/app.page.vue';

import { agGrid } from './plugins/ag-grid.plugin';

import { i18n } from './plugins/i18n.plugin';
import { ui } from '@/next';

async function main() {
  const env = useEnvironment();

  const app = createApp(AppPage);

  app.use(i18n);
  app.use(router);

  agGrid(app);
  app.use(ui);
  // app.use(ElementPlus);

  const vm = app.mount('#app');

  // await boot(vm);

  if (!env.production) {
    console.groupCollapsed('APPLICATION VUE');
    console.dir(app);
    console.groupEnd();

    console.groupCollapsed('VUE');
    console.dir(vm);
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
