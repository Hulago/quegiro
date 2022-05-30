import { I18N_MAIN_CONTAINERS } from '@/containers/main';
import { I18N, useI18n } from '@/next';
import Vue from 'vue';

import I18N_GENERAL from '@/modules/dashboard/i18n/translate';

export type I18nDictionary = typeof I18N_GENERAL & typeof I18N_MAIN_CONTAINERS;

Vue.use(I18N, {
  messages: [I18N_GENERAL, I18N_MAIN_CONTAINERS]
});

const { vueI18nInstance: i18n } = useI18n();

export { i18n };
