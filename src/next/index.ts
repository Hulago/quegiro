import './assets/index.css';

import type { App, Plugin } from 'vue';

import I18N_NEXT from './i18n';

export * from './composables';

export * from './components';

import {
  PAvatar,
  PFieldset,
  PGrid,
  PNoRows,
  PToolbar,
  PUpload,
  // p forms
  PFormInput,
  PFormTextarea,
  PFormInputNumber,
  PFormSelect,
  PFormTree,
  PFormSwitch,
  PFormDatepicker,
  // renders
  PAvatarRender,
  PButtonRender,
  PCheckboxRender,
  PIconRender,
  PStateRender,
  PTagRender,
  PNumberRender,
  PCurrencyRender,
  PDateRender,
  // filters
  PCheckboxFilter,
  PDateFilter,
  PInputFilter,
  PSelectFilter,
  PTreeFilter
} from './components';

export * from './renderers';

export * from './schema';
export * from './forms';

import { PFormControl } from './forms';

export const ui = {
  install(app: App) {
    // components
    app.component('PFieldset', PFieldset);
    app.component('PAvatar', PAvatar);
    app.component('PFieldset', PFieldset);
    app.component('PGrid', PGrid);
    app.component('PNoRows', PNoRows);
    app.component('PToolbar', PToolbar);
    app.component('PUpload', PUpload);
    // renders
    app.component('PAvatarRender', PAvatarRender);
    app.component('PButtonRender', PButtonRender);
    app.component('PCheckboxRender', PCheckboxRender);
    app.component('PIconRender', PIconRender);
    app.component('PStateRender', PStateRender);
    app.component('PTagRender', PTagRender);
    app.component('PNumberRender', PNumberRender);
    app.component('PCurrencyRender', PCurrencyRender);
    app.component('PDateRender', PDateRender);
    // filters
    app.component('PCheckboxFilter', PCheckboxFilter);
    app.component('PDateFilter', PDateFilter);
    app.component('PInputFilter', PInputFilter);
    app.component('PSelectFilter', PSelectFilter);
    app.component('PTreeFilter', PTreeFilter);
    // FormControl
    app.component('PFormControl', PFormControl);
    app.component('PFormInput', PFormInput);
    app.component('PFormTextarea', PFormTextarea);
    app.component('PFormInputNumber', PFormInputNumber);
    app.component('PFormSelect', PFormSelect);
    app.component('PFormTree', PFormTree);
    app.component('PFormSwitch', PFormSwitch);
    app.component('PFormDatepicker', PFormDatepicker);
  }
};

export { I18N_NEXT };
