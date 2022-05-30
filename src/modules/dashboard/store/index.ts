import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const debug = import.meta.env.DEV;

export const storeOptions = {
  modules: {},
  strict: debug
};

export const store = new Vuex.Store(storeOptions);
