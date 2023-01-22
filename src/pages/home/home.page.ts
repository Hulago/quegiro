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
  // metaInfo: {
  //   title: 'Home',
  //   meta: [
  //     { charset: 'utf-8' },
  //     {
  //       name: 'google-site-verification',
  //       content: 'PBkQrOSqcjgQtk1Ee-wlNSRK3VcQb3KewbsXawGmWh8'
  //     },
  //     {
  //       name: 'description',
  //       content: 'Home page for Quegiro'
  //     }
  //   ]
  // },
  setup() {
    const message = 'Welcome to Quegiro';

    const router = useRouter();

    const handleBack = () => {
      console.log('Back');
    };

    const handleStart = () => {
      console.log('AAAA');

      router.push({
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
