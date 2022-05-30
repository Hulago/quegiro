import { options } from '@/common';
import { useLang } from '@/next';
import Vue from 'vue';

const lang = useLang(options.auth.clientId);

async function setupLang(vueInstance: Vue) {
  lang.setSupportedLanguages([
    { code: 'pt', locale: 'pt-PT', name: 'Portuguese' },
    { code: 'en', locale: 'en-gb', name: 'English' },
    { code: 'en-US', locale: 'en-US', name: 'USA' }
  ]);

  lang.setFallback('pt');

  const currentLanguage = await lang.getCurrentLanguage();

  if (!currentLanguage) {
    console.error('UPPS! language error');
  } else {
    (vueInstance.$root as any).$i18n.locale = currentLanguage.locale;
    // vueInstance.$moment.locale(currentLanguage.code);
  }
}

export async function boot(vueInstance: Vue) {
  try {
    // vueInstance.isLoading = true;

    await setupLang(vueInstance);
  } catch (e) {
    // vueInstance.isLoading = false;
    console.error('Error booting app', e);
  } finally {
    // vueInstance.isLoading = false;
  }
}
