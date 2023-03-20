import { defineComponent, PropType } from 'vue';

import type { ApplicationBreadcrumb } from '@/next/types/application-context.type';

import { PAvatar } from '@/next';

import { isDark, toggleDark, useI18n } from '@/next';

import { useRouter } from 'vue-router';

import { ROUTES } from '@/constants/routes.constant';

import { useStorage } from '@vueuse/core';

import MdiCog from '~icons/mdi/cog';
import CircleFlagsPt from '~icons/circle-flags/pt';
import CircleFlagsUs from '~icons/circle-flags/us';

export default defineComponent({
  components: {
    PAvatar,
    MdiCog,
    CircleFlagsPt,
    CircleFlagsUs
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
    const { t, i18n } = useI18n();

    const currentLang = useStorage('currentLang', 'pt-PT');

    /**
     * It emits a user-profile event.
     */
    const handleClickHome = () => {
      emit('home');
    };

    const handleLang = (lang: string) => {
      currentLang.value = lang;
      i18n.global.locale.value = lang;
      window.location.reload();
    };

    return {
      isDark,
      toggleDark,
      t,
      handleClickHome,
      handleLang
    };
  }
});
