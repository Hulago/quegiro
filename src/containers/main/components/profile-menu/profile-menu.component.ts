import { defineComponent, ref } from '@vue/composition-api';
import { mdiDotsVertical } from '@mdi/js';

export default defineComponent({
  setup() {
    const drawer = ref(true);

    return {
      drawer,
      mdiDotsVertical
    };
  }
});
