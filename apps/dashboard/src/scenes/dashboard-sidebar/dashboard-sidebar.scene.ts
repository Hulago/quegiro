import {
  mdiCashLock,
  mdiFormatListBulletedSquare,
  mdiShapeOutline,
  mdiViewDashboard
} from '@mdi/js';
import { useI18n } from '@quegiro/next';
import { defineComponent } from '@vue/composition-api';

import { ROUTES } from '../../constants/routes.constant';

export default defineComponent({
  setup() {
    const { i18n } = useI18n();

    const items = [
      {
        icon: mdiViewDashboard,
        label: i18n('DASHBOARD.LABEL.DASHBOARD'),
        route: {
          name: ROUTES.HOME
        }
      },
      {
        icon: mdiFormatListBulletedSquare,
        label: i18n('DASHBOARD.LABEL.TRANSACTIONS'),
        route: {
          name: ROUTES.TRANSACTIONS
        }
      },
      {
        icon: mdiShapeOutline,
        label: i18n('DASHBOARD.LABEL.CATEGORIES'),
        route: {
          name: ROUTES.CATEGORIES
        }
      },
      {
        icon: mdiCashLock,
        label: i18n('DASHBOARD.LABEL.SALES'),
        route: {
          name: ROUTES.SALES
        }
      }
    ];

    return {
      items
    };
  }
});
