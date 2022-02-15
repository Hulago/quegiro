import Vue from 'vue';
import VueRouter, { RawLocation, RouteConfig } from 'vue-router';

import { ROUTES } from '../constants/routes.constant';
import DepartmentsScene from '../scenes/departments/departments.scene.vue';
import OrganizationSidebarScene from '../scenes/organization-sidebar/organization-sidebar.scene.vue';
import OrganizationScene from '../scenes/organization/organization.scene.vue';
import UserListScene from '../scenes/user-list/user-list.scene.vue';

Vue.use(VueRouter);

const root: RouteConfig = {
  children: [
    {
      components: {
        default: UserListScene,
        sidebar: OrganizationSidebarScene
      },
      meta: {
        requiresAuth: true,
        roles: []
      },
      name: ROUTES.USER_LIST,
      path: 'user-list'
    },
    {
      components: {
        default: DepartmentsScene,
        sidebar: OrganizationSidebarScene
      },
      meta: {
        requiresAuth: true,
        roles: []
      },
      name: ROUTES.DEPARTMENTS,
      path: 'departments'
    }
  ],
  component: OrganizationScene,
  meta: {
    requiresAuth: true,
    roles: []
  },
  name: ROUTES.ORGANIZATION,
  path: '',
  redirect: { name: ROUTES.USER_LIST }
};

const routes: Array<RouteConfig> = [root];

export const router = new VueRouter({
  base: '/apps/organization',
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
