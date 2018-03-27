import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedShowID: null,
    userLoggedIn: false,
    username: null,
    userID: null,
    favorites: [],
  },
  actions: {

  },
  mutations: {
    userIsLoggedIn (state) {
      state.userLoggedIn = true;
    },
    setUsernameAndID (state, data) {
      state.username = data.username;
      state.userID = data.userID;
    },
    setFavorites (state, favorites) {
      state.favorites = favorites;
      //Vue.set(state, 'favorites', favorites)
    },
    logOut(state) {
      state.userLoggedIn =  false;
      state.username = null;
      state.userID = null;
      state.favorites = [];
    }
  },
  getters: {
    
  }
});