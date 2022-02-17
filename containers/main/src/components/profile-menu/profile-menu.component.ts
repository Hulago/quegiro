import { mdiDotsVertical } from '@mdi/js';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const drawer = ref(true);

    return {
      drawer,
      mdiDotsVertical
    };
  }
});
