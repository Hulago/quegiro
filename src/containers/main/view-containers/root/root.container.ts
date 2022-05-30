import { Component } from 'vue-property-decorator';
import Vue from 'vue';

// TODO set locale from store
@Component({
  name: 'root-container'
})
export default class extends Vue {
  // force rerender when locale change
  get locale() {
    return this.$root &&
      (this.$root as any).$i18n &&
      (this.$root as any).$i18n.locale
      ? (this.$root as any).$i18n.locale
      : null;
  }
}
