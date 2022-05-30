import Vuex, { Store } from 'vuex';
import Vue from 'vue';

export interface RootState {
  /* + Loading overlay */
  loading: boolean;
}

Vue.use(Vuex);

const debug = import.meta.env.DEV;

const state: RootState = {
  loading: false
};

export const storeOptions = {
  state,
  modules: {},
  strict: debug
};

export const store = new Store<RootState>(storeOptions);
