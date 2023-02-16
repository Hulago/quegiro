export type AppEnvironment = {
  development: boolean;
  mode: string | null;
  production: boolean;
  redirectUri: string;
  apiBaseUrl: string;
  clientId: string;
  realm: string;
};
