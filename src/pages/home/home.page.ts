import { computed, defineComponent, getCurrentInstance } from 'vue';

import { PToolbar } from '@/next';

import { useI18n } from 'vue-i18n';

import {} from '@vueuse/head';

import { useRouter } from 'vue-router';
import { ROUTES } from '@/constants/routes.constant';

import HomeSvg from '@/components/svgs/home.svg.vue';

import { useHead } from '@vueuse/head';

import { useLabels } from '@/composables/labels/labels.composable';

import CardLangSetupPT from './card-lang-setup-pt.vue';
import CardTableConfigPT from './card-table-config-pt.vue';
import CardAgregateDataPT from './card-agregate-data-pt.vue';

import CardLangSetupEN from './card-lang-setup-en.vue';
import CardTableConfigEN from './card-table-config-en.vue';
import CardAgregateDataEN from './card-agregate-data-en.vue';

export default defineComponent({
  name: 'Home',
  components: {
    PToolbar,
    HomeSvg,
    CardLangSetupPT,
    CardTableConfigPT,
    CardAgregateDataPT,
    CardLangSetupEN,
    CardTableConfigEN,
    CardAgregateDataEN
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
          content:
            'Aplicação que permite importar as transacções do seu broker para mais facilmente declarar o seu IRS e calcular as suas mais valias'
        },
        {
          property: 'og:site_name',
          content: 'Quegiro'
        },
        {
          property: 'og:url',
          content: 'https://quegiro.netlify.app/home'
        }
      ]
    });

    const { labels } = useLabels();

    const { locale } = useI18n();

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

    const currentLang = computed(() => locale.value);

    return {
      message,
      handleBack,
      handleStart,
      labels,
      currentLang
    };
  }
});
