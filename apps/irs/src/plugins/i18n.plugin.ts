import { I18N_MAIN_CONTAINERS } from '@quegiro/main-containers';
import { I18N, useI18n } from '@quegiro/next';
import Vue from 'vue';

import I18N_GENERAL from '../i18n/translate';

export type I18nDictionary = typeof I18N_GENERAL & typeof I18N_MAIN_CONTAINERS;

Vue.use(I18N, {
  messages: [I18N_GENERAL, I18N_MAIN_CONTAINERS]
});

const { vueI18nInstance: i18n } = useI18n();

export { i18n };
