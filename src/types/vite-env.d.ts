/// <reference types="vite/client" />

interface ImportMetaEnv
  extends Readonly<Record<string, string | boolean | undefined>> {
  readonly VITE_BASE_URL: string;
  readonly VITE_BUILD_MODE: string;
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_PRIVATE_BASE_URL: string;
  readonly VITE_REALM: string;
  readonly VITE_AUTH_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
