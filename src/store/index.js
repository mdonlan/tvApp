import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedShowID: null,
    userLoggedIn: false,
    username: null,
  },
  actions: {

  },
  mutations: {
    userIsLoggedIn (state) {
      state.userLoggedIn = true;
    },
    setUsername (state, username) {
      state.username = username;
    }
  },
  getters: {

  }
});