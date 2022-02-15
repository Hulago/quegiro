/**
 * Copyright Prozis All Rights Reserved.
 */
import { FormControl } from '@quegiro/next';
import { Component, Prop, Vue } from 'vue-property-decorator';

/**
 * PkFormControl
 *
 * Component providers to use on field forms controls
 *
 * @example
 * ```html
 * <pk-form-control :form-control="fg.name" >
 *  <pk-input v-model="model.name" #default={ on , errors} :errors="errors" v-on="on" />
 * </pk-form-control>
 * ```
 */
@Component({
  name: 'PkFormControl'
})
export default class PkFormControlComponent extends Vue {
  /**
   * FormControl bind.
   */
  @Prop({
    default: () => null,
    type: Object
  })
  formControl!: FormControl;

  /**
   * Component properties
   */
  get errors() {
    return this.formControl.errors.map((error) =>
      this.$t(error.i18n, {
        constraint: error.constraints,
        value: error.value
      })
    );
  }

  /**
   * Handle focus event
   *
   * @param event focus event object
   */
  input(event: any) {
    if (this.formControl) {
      this.formControl.setData(event);
      this.formControl.validate();
    }

    if (!this.formControl.isDirty) {
      // eslint-disable-next-line id-match
      this.formControl.isDirty = true;
    }

    this.formControl.notifyParent();

    this.$emit('input', event);
  }

  /**
   * Handle focus event
   *
   * @param event focus event object
   */
  focus(event: any) {
    if (this.formControl) {
      // eslint-disable-next-line id-match
      this.formControl.isFocus = true;

      if (!this.formControl.isTouch) {
        // eslint-disable-next-line id-match
        this.formControl.isTouch = true;
      }

      this.formControl.notifyParent();
    }

    this.$emit('focus', event);
  }

  /**
   * Handle blur event
   *
   * @param event blur event
   */
  blur(event: any) {
    if (this.formControl) {
      // eslint-disable-next-line id-match
      this.formControl.isFocus = false;

      if (!this.formControl.isTouch) {
        // eslint-disable-next-line id-match
        this.formControl.isTouch = true;
      }

      this.formControl.validate();
      this.formControl.notifyParent();
    }

    this.$emit('blur', event);
  }

  render() {
    const slot = this.$scopedSlots.default({
      errors: this.errors,
      hasErrors: this.formControl.hasErrors,
      isDirty: this.formControl.isDirty,
      isFocus: this.formControl.isFocus,
      isLoading: this.formControl.isLoading,
      isPrestine: this.formControl.isPrestine,
      isTouch: this.formControl.isTouch,
      isValid: this.formControl.isValid,
      on: {
        ...this.$listeners,
        blur: this.blur,
        focus: this.focus,
        input: this.input
      }
    });

    return Array.isArray(slot) ? slot[0] : slot;
  }
}
