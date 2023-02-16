<template>
  <slot :errors="errors" :error="error" :on="on" />
</template>

<script lang="ts">
import { ref, defineComponent, computed, unref } from 'vue';

import { useI18n } from '@/next';

export default defineComponent({
  name: 'FormControl',
  props: {
    formControl: {
      default: () => null,
      type: Object
    },
    modelEvent: {
      default: 'modelValue',
      type: String
    }
  },
  emits: ['blur', 'focus', 'input'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const blur = (event: any) => {
      if (props.formControl) {
        // eslint-disable-next-line id-match, vue/no-mutating-props
        props.formControl.isFocus = false;

        if (!props.formControl.isTouch) {
          // eslint-disable-next-line id-match, vue/no-mutating-props
          props.formControl.isTouch = true;
        }

        props.formControl.validate();
        props.formControl.notifyParent();
      }

      emit('blur', event);
    };

    const focus = (event: any) => {
      if (props.formControl) {
        // eslint-disable-next-line id-match, vue/no-mutating-props
        props.formControl.isFocus = true;

        if (!props.formControl.isTouch) {
          // eslint-disable-next-line id-match, vue/no-mutating-props
          props.formControl.isTouch = true;
        }

        props.formControl.notifyParent();
      }

      emit('focus', event);
    };

    const input = (event: any) => {
      if (props.formControl) {
        props.formControl.setData(unref(event));
        props.formControl.validate();
      }

      if (!props.formControl.isDirty) {
        // eslint-disable-next-line id-match, vue/no-mutating-props
        props.formControl.isDirty = true;
      }

      props.formControl.notifyParent();

      emit('input', event);
    };

    const errors = computed(() => {
      return props.formControl.errors && props.formControl.errors.length > 0
        ? props.formControl.errors
        : [];
    });

    const error = computed(() => {
      // console.log('Validate Error', unref(props.formControl.errors[0]));
      const formControlError =
        props.formControl.errors && props.formControl.errors.length > 0
          ? props.formControl.errors[0]
          : null;

      return formControlError
        ? t(formControlError.i18n, {
            data: {
              ...unref(formControlError.constraints),
              value: unref(formControlError.value)
            }
          })
        : null;
    });

    return {
      errors,
      error,
      on: {
        onBlur: blur,
        onFocus: focus,
        onInput: input,
        onChange: input,
        change: input,
        'onUpdate:modelValue': input
      }
    };
  }
});
</script>
