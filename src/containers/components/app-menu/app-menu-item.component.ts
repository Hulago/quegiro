import { defineComponent, PropType } from 'vue';

import type { MenuItem } from '@/containers/types';

export default defineComponent({
  name: 'AppMenuItem',
  props: {
    menuItems: { type: Array as PropType<Array<MenuItem>>, default: () => [] }
  },
  setup() {
    const hasChildren = (item: MenuItem) => {
      return item.children && item.children.length > 0;
    };

    return {
      hasChildren
    };
  }
});
