import AppContainer from '@/containers/view-containers/app/app.container.vue';
import { defineComponent } from 'vue';

import mdiFormatListBulletedSquare from '~icons/mdi/format-list-bulleted-square';
import mdiViewDashboard from '~icons/mdi/view-dashboard';
import mdiShapeOutline from '~icons/mdi/shape-outline';
import mdiCashLock from '~icons/mdi/cash-lock';
import mdiDatabase from '~icons/mdi/database';
import mdiBank from '~icons/mdi/bank';

import { ROUTES } from '@/constants/routes.constant';

import { useI18n } from '@/next';

export default defineComponent({
  components: { AppContainer },
  setup() {
    const { t } = useI18n();

    const menuItems = [
      {
        id: '1',
        icon: mdiViewDashboard,
        label: t('APP.LABEL.DASHBOARD'),
        to: {
          name: ROUTES.DASHBOARD
        }
      },
      {
        id: '2',
        icon: mdiDatabase,
        label: t('APP.LABEL.DATA'),
        to: {
          name: ROUTES.DATA
        }
      },
      {
        id: '3',
        icon: mdiFormatListBulletedSquare,
        label: t('APP.LABEL.TRANSACTIONS'),
        to: {
          name: ROUTES.TRANSACTIONS
        }
      },
      {
        id: '4',
        icon: mdiShapeOutline,
        label: t('APP.LABEL.CATEGORIES'),
        to: {
          name: ROUTES.CATEGORIES
        }
      },
      {
        id: '5',
        icon: mdiCashLock,
        label: t('APP.LABEL.SALES'),
        to: {
          name: ROUTES.SALES
        }
      },
      {
        id: '6',
        icon: mdiBank,
        label: t('APP.LABEL.ACCOUNT'),
        to: {
          name: ROUTES.ACCOUNT
        }
      }
    ];

    return {
      menuItems
    };
  }
});
