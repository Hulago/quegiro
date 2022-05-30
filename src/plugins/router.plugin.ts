/* eslint-disable @typescript-eslint/ban-types */
import VueRouter, { RawLocation, RouteConfig } from 'vue-router';
import Vue from 'vue';

import DashboardSidebarScene from '@/modules/dashboard/scenes/dashboard-sidebar/dashboard-sidebar.scene.vue';
import TransactionsScene from '@/modules/dashboard/scenes/transactions/transactions.scene.vue';
import CategoriesScene from '@/modules/dashboard/scenes/categories/categories.scene.vue';
import DashboardScene from '@/modules/dashboard/scenes/dashboard/dashboard.scene.vue';
import SalesScene from '@/modules/dashboard/scenes/sales/sales.scene.vue';
import HomeScene from '@/modules/dashboard/scenes/home/home.scene.vue';
import DataScene from '@/modules/dashboard/scenes/data/data.scene.vue';
import { ROUTES } from '@/modules/dashboard/constants/routes.constant';

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
