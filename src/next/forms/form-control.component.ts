export default {
  computed: {
    errors(): string[] {
      const { errors = [] } = (this as any).formControl || {};
      return errors.map((error: any) => {
        return (this as any).$t(error.i18n, {
          constraint: error.constraints,
          value: error.value
        });
      });
    }
  },
  methods: {
    blur(event: any) {
      if ((this as any).formControl) {
        // eslint-disable-next-line id-match
        (this as any).formControl.isFocus = false;

        if (!(this as any).formControl.isTouch) {
          // eslint-disable-next-line id-match
          (this as any).formControl.isTouch = true;
        }

        (this as any).formControl.validate();
        (this as any).formControl.notifyParent();
      }

      (this as any).$emit('blur', event);
    },
    focus(event: any) {
      if ((this as any).formControl) {
        // eslint-disable-next-line id-match
        (this as any).formControl.isFocus = true;

        if (!(this as any).formControl.isTouch) {
          // eslint-disable-next-line id-match
          (this as any).formControl.isTouch = true;
        }

        (this as any).formControl.notifyParent();
      }

      (this as any).$emit('focus', event);
    },
    input(event: any) {
      if ((this as any).formControl) {
        (this as any).formControl.setData(event);
        (this as any).formControl.validate();
      }

      if (!(this as any).formControl.isDirty) {
        // eslint-disable-next-line id-match
        (this as any).formControl.isDirty = true;
      }

      (this as any).formControl.notifyParent();

      (this as any).$emit('input', event);
    }
  },
  name: 'FormControl',
  props: {
    formControl: {
      default: () => null,
      type: Object
    },
    modelEvent: {
      default: 'input',
      type: String
    }
  },

  render(): any {
    const slot = (this as any).$scopedSlots.default({
      errors: (this as any).errors,
      hasErrors: (this as any).formControl.hasErrors,
      isDirty: (this as any).formControl.isDirty,
      isFocus: (this as any).formControl.isFocus,
      isLoading: (this as any).formControl.isLoading,
      isPrestine: (this as any).formControl.isPrestine,
      isTouch: (this as any).formControl.isTouch,
      isValid: (this as any).formControl.isValid,
      on: {
        ...(this as any).$listeners,
        blur: (this as any).blur,
        focus: (this as any).focus,
        [(this as any).modelEvent]: (this as any).input
      }
    });

    return Array.isArray(slot) ? slot[0] : slot;
  }
};
