import { mdiViewDashboard } from '@mdi/js';
import { Welcome } from '@quegiro/common';
import { MainContainer } from '@quegiro/main-containers';
import { defineComponent, ref } from '@vue/composition-api';

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
