import I18N_MAIN_CONTAINERS from '@/containers/i18n';
import { I18N_NEXT, useI18n } from '@/next';
import I18N_GENERAL from '@/i18n';

import { merge } from 'lodash-es';

export const { i18n } = useI18n(
  merge(I18N_MAIN_CONTAINERS, I18N_GENERAL, I18N_NEXT)
);

export type I18nDictionaryNews = typeof I18N_GENERAL &
  typeof I18N_NEXT &
  typeof I18N_MAIN_CONTAINERS;
