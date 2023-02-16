import { defineComponent, ref, PropType, computed } from 'vue';
import type { Component } from 'vue';

import Account from '~icons/mdi/account';

type AvatarSize = number | 'large' | 'default' | 'small';
type AvatarFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

export default defineComponent({
  name: 'PAvatar',
  props: {
    size: {
      type: [String, Number] as PropType<AvatarSize>,
      default: 'default'
    },
    icon: { type: Object as PropType<Component>, default: () => Account },
    letters: { type: String, default: null },
    fit: { type: String as PropType<AvatarFit>, default: 'cover' },
    photo: { type: String, default: null }
  },
  setup(props) {
    const hasError = ref(false);

    const selectedIcon = computed(() => {
      if (props.photo && !hasError.value) {
        return null;
      }

      if (props.letters !== null) {
        return null;
      }

      return props.icon;
    });

    const handleError = () => {
      hasError.value = true;
      return true;
    };

    const iconSize = computed(() => {
      if (props.size === 'small') {
        return 16;
      }

      if (props.size === 'default') {
        return 20;
      }

      if (props.size === 'large') {
        return 24;
      }

      return Number(props.size) * 0.75;
    });

    return {
      hasError,
      selectedIcon,
      handleError,
      iconSize
    };
  }
});
