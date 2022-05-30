import { reactive, UnwrapRef } from '@vue/composition-api';

type AppEnvironment = {
  development: boolean;
  mode: string | null;
  production: boolean;
};

// eslint-disable-next-line max-len
export const useEnvironment = <Environment extends Record<string, unknown>>(
  currentEnv = {} as Environment
): UnwrapRef<{ env: AppEnvironment & Environment }> => {
  const env = reactive({
    development: import.meta.env.DEV,
    mode: import.meta.env.MODE,
    production: import.meta.env.PROD,
    ...currentEnv
  });

  return {
    env
  };
};
