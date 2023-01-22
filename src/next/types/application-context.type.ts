import type { RouteLocation } from 'vue-router';

export interface ApplicationContextState {
  miniSidebar: boolean;
  breadcrumb: Array<ApplicationBreadcrumb>;
  size: 'small' | 'default' | 'large';
  isLoading: boolean;
}

export interface ApplicationBreadcrumb {
  title: string;
  replace?: boolean;
  to?: Partial<RouteLocation>;
}
