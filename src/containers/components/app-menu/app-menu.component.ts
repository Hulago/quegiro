import { PropType, defineComponent, ref } from 'vue';

import type { MenuItem } from '@/containers/types';
import { useI18n } from '@/next';

import AppMenuItem from './app-menu-item.component.vue';

export default defineComponent({
  components: {
    AppMenuItem
  },
  props: {
    isCollapsed: { type: Boolean, default: true },
    menuItems: { type: Array as PropType<Array<MenuItem>>, default: () => [] }
  },
  emits: ['toggle-menu', 'select'],
  setup(props, { emit }) {
    const { t } = useI18n();

    function findItem(menuItems: Array<MenuItem>, id: string) {
      let res = menuItems.find(item => item.id === id);

      for (let i = 0; !res && i < menuItems.length; i++) {
        res = findItem(menuItems[i].children || [], id);
      }

      return res;
    }

    const hasChildren = (item: MenuItem) => {
      return item.children && item.children.length > 0;
    };

    const active = ref<string>('0');

    const handleSelect = (
      index: string,
      indexPath: unknown,
      item: unknown,
      routeResult: unknown
    ) => {
      const res = findItem(props.menuItems, index);

      active.value = res?.id !== '0' ? (res?.id as string) : active.value;

      emit('select', res);
    };

    return {
      active,
      handleSelect,
      hasChildren,
      t
    };
  }
});
