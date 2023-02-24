import { defineComponent } from 'vue';

import { PToolbar } from '@/next';

import {} from '@vueuse/head';

import { useRouter } from 'vue-router';
import { ROUTES } from '@/constants/routes.constant';

import HomeSvg from '@/components/svgs/home.svg.vue';

import { useHead } from '@vueuse/head';

export default defineComponent({
  name: 'Home',
  components: {
    PToolbar,
    HomeSvg
  },
  setup() {
    useHead({
      title: 'Home',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'google-site-verification',
          content: 'PBkQrOSqcjgQtk1Ee-wlNSRK3VcQb3KewbsXawGmWh8'
        },
        {
          name: 'description',
          content: 'declaração IRS dividendos valias ações'
        }
      ]
    });

    const message = 'Welcome to Quegiro';

    const { back, push } = useRouter();

    const handleBack = () => {
      back();
    };

    const handleStart = () => {
      push({
        name: ROUTES.DATA
      });
    };

    return {
      message,
      handleBack,
      handleStart
    };
  }
});
