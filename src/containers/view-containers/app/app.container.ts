import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue';
import { defineComponent } from 'vue';

import AppToolbar from '@/containers/components/app-toolbar/app-toolbar.component.vue';
import AppMenu from '@/containers/components/app-menu/app-menu.component.vue';

import { useApplicationContext, isDark, toggleDark } from '@/next';

import type { MenuItem } from '@/containers/types';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/constants/routes.constant';

export default defineComponent({
  components: {
    AppMenu,
    AppToolbar
  },
  props: {
    menuItems: { type: Array, default: () => [] },
    active: { type: String, default: null }
  },
  emits: ['user-profile', 'app-menu-select'],
  setup(props, { emit }) {
    const { miniSidebar, size, breadcrumb, toggleSidebar } =
      useApplicationContext();

    const router = useRouter();

    const handleHome = () => {
      router.push({ name: ROUTES.HOME });
    };

    const handleSelect = (item: MenuItem) => {
      if (item) {
        if (item.to) {
          router.push(item.to);
        } else if (item.url) {
          window.open(item.url, '_self', 'noreferrer');
        } else {
          emit('app-menu-select', item);
        }
      }
    };

    return {
      IconMenu,
      Message,
      Setting,
      miniSidebar,
      toggleSidebar,
      isDark,
      toggleDark,
      breadcrumb,
      handleSelect,
      size,
      name,
      handleHome
    };
  }
});
