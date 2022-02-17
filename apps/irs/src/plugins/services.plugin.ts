import { options } from '@quegiro/common';
import { Auth, HTTP, useAuth, useHTTPFilter } from '@quegiro/next';
import Vue from 'vue';

import { router } from './router.plugin';

const { legacyFilterParser } = useHTTPFilter();

Vue.use(Auth, options.auth);
Vue.use(HTTP, {
  baseUrl: options.baseUrl,
  config: { paramsParser: legacyFilterParser }
});

const { validate } = useAuth();

router.beforeEach(validate);
