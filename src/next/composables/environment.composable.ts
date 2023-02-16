import type { AppEnvironment } from '../types/environment.type';

// eslint-disable-next-line max-len
export const useEnvironment = (
  currentEnv = {} as Record<string, unknown>
): AppEnvironment => {
  const env = {
    development: import.meta.env.DEV,
    mode: import.meta.env.MODE,
    production: import.meta.env.PROD,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
    apiBaseUrl: import.meta.env.VITE_PRIVATE_BASE_URL,
    clientId: import.meta.env.VITE_CLIENT_ID,
    realm: import.meta.env.VITE_REALM,
    ...currentEnv
  };

  return {
    ...env
  };
};
