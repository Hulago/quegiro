import { Welcome } from '@quegiro/common';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const message = ref(Welcome('Dashboard One :)'));

    return {
      message
    };
  }
});
