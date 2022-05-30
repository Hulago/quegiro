import { defineComponent, ref } from '@vue/composition-api';
import { MainContainer } from '@/containers/main';
import { mdiViewDashboard } from '@mdi/js';
import { Welcome } from '@/common';

export default defineComponent({
  components: { MainContainer },
  setup() {
    const message = ref(Welcome('Dashboard App :)'));

    const drawer = ref(true);

    return {
      drawer,
      mdiViewDashboard,
      message
    };
  }
});
