import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = import.meta.env.DEV;

export const storeOptions = {
  modules: {},
  strict: debug
};

export const store = new Vuex.Store(storeOptions);