import { Component } from 'vue-property-decorator';
import Vue from 'vue';

// TODO set locale from store
@Component({
  name: 'root-container',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Quegiro',
    // all titles will be injected into this template
    titleTemplate: '%s | Quegiro'
  }
})
export default class extends Vue {
  // force rerender when locale change
  loading = false;

  get locale() {
    return this.$root &&
      (this.$root as any).$i18n &&
      (this.$root as any).$i18n.locale
      ? (this.$root as any).$i18n.locale
      : null;
  }
}
