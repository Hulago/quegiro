import { defineComponent } from 'vue';

import { PToolbar } from '@/next';

import { useRouter } from 'vue-router';
import { ROUTES } from '@/constants/routes.constant';

import HomeSvg from '@/components/svgs/home.svg.vue';

export default defineComponent({
  name: 'Home',
  components: {
    PToolbar,
    HomeSvg
  },
  metaInfo: {
    title: 'Home',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'google-site-verification',
        content: 'PBkQrOSqcjgQtk1Ee-wlNSRK3VcQb3KewbsXawGmWh8'
      },
      {
        name: 'description',
        content:
          'Introducing our new tax calculation application for stock transactions. Our user-friendly platform makes it easy to import your transaction data in the form of a CSV file. Our system will automatically process the information and calculate all of the necessary tax entries for you to declare to the tax authorities.'
      }
    ]
  },
  setup() {
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
