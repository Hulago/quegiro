import type { RouteLocationRaw } from 'vue-router';
import type { Component } from 'vue';
export interface MenuItem {
  id: string | number;
  counter?: number;
  label: string;
  icon?: Component;
  isGroup?: boolean;
  to?: Partial<RouteLocationRaw>;
  url?: string;
  roles?: string[];
  children?: Array<MenuItem>;
}
