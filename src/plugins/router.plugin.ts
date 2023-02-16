import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import TransactionsPage from '@/pages/transactions/transactions.page.vue';
// import AppSidebarPage from '@/pages/app-sidebar/app-sidebar.page.vue';
import CategoriesPage from '@/pages/categories/categories.page.vue';
import DashboardPage from '@/pages/dashboard/dashboard.page.vue';
import SalesPage from '@/pages/sales/sales.page.vue';
import DataPage from '@/pages/data/data.page.vue';
import HomePage from '@/pages/home/home.page.vue';
import AccountPage from '@/pages/account/account.page.vue';
import AppPage from '@/pages/app/app.page.vue';

import { ROUTES } from '@/constants/routes.constant';

const BASE_URL = '/';

const routes: Array<RouteRecordRaw> = [
  {
    component: CategoriesPage,
    name: ROUTES.CATEGORIES,
    path: '/categories'
  },
  {
    component: DashboardPage,
    name: ROUTES.DASHBOARD,
    path: '/dashboard'
  },
  {
    component: HomePage,
    name: ROUTES.HOME,
    path: '/home'
  },
  {
    component: DataPage,
    name: ROUTES.DATA,
    path: '/data'
  },
  {
    component: SalesPage,
    name: ROUTES.SALES,
    path: '/sales'
  },
  {
    component: TransactionsPage,
    name: ROUTES.TRANSACTIONS,
    path: '/transactions'
  },
  {
    component: AccountPage,
    name: ROUTES.ACCOUNT,
    path: '/account'
  },
  {
    name: ROUTES.APP,
    path: '',
    redirect: { name: ROUTES.HOME }
  }
];

export const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes
});
