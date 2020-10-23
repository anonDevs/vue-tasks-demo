import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '' || localStorage.getItem('accessToken')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem('accessToken', token);
    },
    LOGOUT: (state) => {
      state.token = '',
        localStorage.removeItem('accessToken');
    }
  },
  actions: {
  },
  modules: {
  }
});
