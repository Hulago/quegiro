import { defineComponent, PropType } from 'vue';

import type { ApplicationBreadcrumb } from '@/next/types/application-context.type';

import { PAvatar } from '@/next';

import { isDark, toggleDark, useI18n } from '@/next';

export default defineComponent({
  components: {
    PAvatar
  },
  props: {
    breadcrumb: {
      type: Array as PropType<Array<ApplicationBreadcrumb>>,
      default: () => []
    },
    name: { type: String, default: '-' },
    email: { type: String, default: '-' },
    initials: { type: String, default: '-' },
    photo: { type: String, default: '-' }
  },
  emits: ['home'],
  setup(props, { emit }) {
    const { t } = useI18n();

    /**
     * It emits a user-profile event.
     */
    const handleClickHome = () => {
      emit('home');
    };

    return {
      isDark,
      toggleDark,
      t,
      handleClickHome
    };
  }
});
