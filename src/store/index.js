import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token); // 同步到 localStorage
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
    saveToken({ commit }, token) {
      commit('setToken', token);
    },
    removeToken({ commit }) {
      commit('clearToken');
    }
  },
  getters: {
    token: state => state.token
  }
});

export default store;
