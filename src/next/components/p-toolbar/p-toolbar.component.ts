import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PToolbar',
  props: {
    title: {
      default: null,
      type: String
    },
    back: { type: String, default: null },
    showBreadcrumb: { type: Boolean, default: false }
  },
  emits: ['back'],
  setup(props, { emit }) {
    const handleBack = () => {
      emit('back');
    };

    return {
      handleBack
    };
  }
});
