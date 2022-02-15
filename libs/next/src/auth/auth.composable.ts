/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Copyright Prozis All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://prozis.com/license
 *
 */

import { computed, reactive, toRefs } from '@vue/composition-api';
import Keycloak, { KeycloakConfig } from 'keycloak-js';
import { isFunction, uniq } from 'lodash-es';
import { Location, RawLocation, Route } from 'vue-router';

let keycloakInstance: Keycloak.KeycloakInstance = null;

export interface AuthOptions extends KeycloakConfig {
  credentials?: any;
  redirectUri?: string;
  unauthorizedRouteName?: string;
}

const state = reactive({
  authenticated: false,
  clientId: null,
  profile: null,
  realm: null,
  redirectUri: '',
  refreshToken: null,
  token: null,
  tokenParsed: null,
  unauthorizedRouteName: ''
});

let installed = false;

export function useAuth(fn?: () => Promise<void>) {
  /**
   * Check roles
   *
   * @param roles - { string[] | string }
   */
  const hasRoles = (roles: string[] | string) => {
    const { groups = [] } = (keycloakInstance.tokenParsed as any) || {};

    if (keycloakInstance.authenticated) {
      // If string validate role
      if (typeof roles === 'string') {
        return (
          keycloakInstance.hasRealmRole(roles) ||
          keycloakInstance.hasResourceRole(roles) ||
          groups.includes(roles)
        );
      }
      // if empty array return true
      if (!roles.length) {
        return true;
      }
      // if an array of roles must have every role in array
      return roles.reduce(
        (prev, role) =>
          prev &&
          (keycloakInstance.hasRealmRole(role) ||
            keycloakInstance.hasResourceRole(role) ||
            groups.includes(role)),
        true
      );
    } else {
      return false;
    }
  };

  /**
   * Check if has one of the roles
   *
   * @param roles - { string[] | string }
   */
  const hasOneRoleOf = (roles: string[] | string) => {
    const { groups = [] } = (keycloakInstance.tokenParsed as any) || {};

    if (keycloakInstance.authenticated) {
      // If string validate role
      if (typeof roles === 'string') {
        return (
          keycloakInstance.hasRealmRole(roles) ||
          keycloakInstance.hasResourceRole(roles) ||
          groups.includes(roles)
        );
      }
      // if empty array return true
      if (!roles.length) {
        return true;
      }
      // if an array of roles must have at leat one role of the array
      return roles.reduce(
        (prev, role) =>
          prev ||
          keycloakInstance.hasRealmRole(role) ||
          keycloakInstance.hasResourceRole(role) ||
          groups.includes(role),
        false
      );
    } else {
      return false;
    }
  };

  /**
   * Init service
   *
   * @param next - { (loaction: RawLocation) => void }
   * @param roles - { string[] | null | undefined }
   * @param action - { string | null | undefined }
   */
  // eslint-disable-next-line max-params
  const init = async (
    next: (location?: RawLocation) => void,
    roles: string[] | null | undefined,
    to: Route
  ) => {
    try {
      await keycloakInstance.init({
        checkLoginIframe: false,
        onLoad: 'login-required',
        redirectUri: `${location.href}`
      });

      await keycloakInstance.updateToken(1);

      state.authenticated = keycloakInstance.authenticated;
      state.token = keycloakInstance.token;
      state.refreshToken = keycloakInstance.refreshToken;
      state.tokenParsed = keycloakInstance.tokenParsed;

      state.profile = await keycloakInstance.loadUserProfile();

      if (isFunction(fn)) {
        await fn();
      }

      if (roles) {
        if (hasOneRoleOf(roles)) {
          next();
        } else {
          next({ name: state.unauthorizedRouteName });
        }
      } else {
        next();
      }
    } catch (e) {
      console.error('failed to login', e);
    }
  };

  /**
   * Validate auth
   *
   * @param action - { string | undefined | null }
   */
  const validate = (
    to: Route,
    from: Route,
    next: (location?: RawLocation | Location | string) => void
  ) => {
    if (to.meta.requiresAuth) {
      if (!state.authenticated) {
        init(next, to.meta.roles, to);
      } else {
        if (to.meta.roles) {
          if (hasOneRoleOf(to.meta.roles)) {
            next();
          } else {
            next({ name: state.unauthorizedRouteName });
          }
        } else {
          next();
        }
      }
    } else {
      next();
    }
  };

  /**
   * Logout user
   *
   * @param options { {redirectUri: string} }
   */
  const logout = async (options = { redirectUri: state.redirectUri }) =>
    keycloakInstance.logout(options);

  const refresh = async (minValidity = 5) => {
    try {
      await keycloakInstance.updateToken(minValidity);

      state.token = keycloakInstance.token;
      state.refreshToken = keycloakInstance.refreshToken;
      state.tokenParsed = keycloakInstance.tokenParsed;

      return keycloakInstance.token;
    } catch (e) {
      console.error('Error refreshing token', e);
    }
  };

  const authRoles = computed(() => {
    let resourceRoles: string[] = [];
    let realmRoles: string[] = [];

    const { authenticated = false, clientId = '' } = state || {};
    const {
      groups = [],
      realm_access: realmAccess = null,
      resource_access: resourceAccess = null
    } = state.tokenParsed || {};

    if (
      authenticated &&
      resourceAccess &&
      resourceAccess[clientId] &&
      resourceAccess[clientId].roles
    ) {
      resourceRoles = resourceAccess[state.clientId].roles;
    }

    if (realmAccess && realmAccess.roles) {
      realmRoles = realmAccess.roles;
    }

    return uniq([...realmRoles, ...resourceRoles, ...groups]);
  });

  return {
    ...toRefs(state),
    authRoles,
    hasOneRoleOf,
    hasRoles,
    init,
    keycloakInstance,
    logout,
    refresh,
    validate
  };
}

export default {
  install(Vue, keycloakConfig: AuthOptions) {
    if (!installed) {
      installed = true;

      const {
        clientId = '',
        credentials = null,
        realm = '',
        redirectUri = '',
        unauthorizedRouteName = '',
        url = ''
      } = keycloakConfig || {};

      state.unauthorizedRouteName = unauthorizedRouteName;
      state.redirectUri = redirectUri;
      state.clientId = clientId;
      state.realm = realm;

      keycloakInstance = Keycloak({
        clientId,
        credentials,
        realm,
        url
      } as any);

      Vue.prototype.$auth = useAuth();
    }
  }
};
