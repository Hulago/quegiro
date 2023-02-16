import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'PFieldset',
  props: {
    title: { type: String, default: null },
    height: { type: String, default: null },
    showToolbar: { type: [String, Boolean], default: false },
    resizable: { type: [String, Boolean], default: false },
    isLoading: { type: [String, Boolean], default: false }
  },
  setup(props) {
    const style = computed(() => {
      let resizable = {};

      if (props.resizable || props.resizable === '') {
        resizable = {
          overflow: 'auto',
          resize: 'vertical'
        };
      }

      return {
        ...resizable,
        height: props.height
      };
    });

    return {
      style
    };
  }
});
