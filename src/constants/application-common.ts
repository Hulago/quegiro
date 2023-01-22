/* eslint-disable prefer-destructuring */
import { COMMON_ROUTES } from './routes-common';

const clientId = import.meta.env.VITE_CLIENT_ID;
const privateBaseUrl = import.meta.env.VITE_PRIVATE_BASE_URL;
const realm = import.meta.env.VITE_REALM;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const unauthorizedRouteName: string = COMMON_ROUTES.APP.UNAUTHORIZED;
const authUrl = import.meta.env.VITE_AUTH_URL;

const auth = {
  clientId,
  privateBaseUrl,
  realm,
  redirectUri,
  unauthorizedRouteName,
  url: authUrl
};

export const options = {
  auth,
  baseUrl: auth.redirectUri,
  defaultLanguage: {
    code: 'pt-PT',
    name: 'Portugues'
  },
  defaultTheme: {
    name: `${clientId}`
  },
  graphqlEndpoint: 'http://localhost:3000/graphql'
};
