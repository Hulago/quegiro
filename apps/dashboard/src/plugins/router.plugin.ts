import Vue from 'vue';
import VueRouter, { RawLocation, RouteConfig } from 'vue-router';

import { ROUTES } from '../constants/routes.constant';
import CategoriesScene from '../scenes/categories/categories.scene.vue';
import DashboardSidebarScene from '../scenes/dashboard-sidebar/dashboard-sidebar.scene.vue';
import DashboardScene from '../scenes/dashboard/dashboard.scene.vue';
import HomeScene from '../scenes/home/home.scene.vue';
import SalesScene from '../scenes/sales/sales.scene.vue';
import TransactionsScene from '../scenes/transactions/transactions.scene.vue';
import DataScene from '../scenes/data/data.scene.vue';

Vue.use(VueRouter);

const root: RouteConfig = {
  children: [
    {
      components: {
        default: DataScene,
        sidebar: DashboardSidebarScene
      },

      name: ROUTES.DATA,
      path: 'data'
    },
    {
      components: {
        default: HomeScene,
        sidebar: DashboardSidebarScene
      },

      name: ROUTES.HOME,
      path: 'home'
    },
    {
      components: {
        default: TransactionsScene,
        sidebar: DashboardSidebarScene
      },
      name: ROUTES.TRANSACTIONS,
      path: 'transactions'
    },
    {
      components: {
        default: CategoriesScene,
        sidebar: DashboardSidebarScene
      },
      name: ROUTES.CATEGORIES,
      path: 'categories'
    },
    {
      components: {
        default: SalesScene,
        sidebar: DashboardSidebarScene
      },
      name: ROUTES.SALES,
      path: 'sales'
    }
  ],
  component: DashboardScene,
  name: ROUTES.DASHBOARD,
  path: '',
  redirect: { name: ROUTES.HOME }
};

const routes: Array<RouteConfig> = [root];

export const router = new VueRouter({
  base: '/apps/dashboard',
  linkActiveClass: 'active',
  mode: 'history',
  routes
});

const originalMethod = VueRouter.prototype['push'];
router.push = function push(
  location: RawLocation,
  onComplete?: Function,
  onAbort?: (err: Error) => void
) {
  if (onComplete || onAbort) {
    return originalMethod.call(this, location, onComplete, onAbort);
  }

  return (originalMethod.call(this, location) as any).catch((err: Error) => {
    if (err.name !== 'NavigationDuplicated') {
      return Promise.reject(err);
    }

    return err;
  });
};
