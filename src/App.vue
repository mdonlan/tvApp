<template>
  <div id="app">
    <topNav></topNav>
    <router-view/>
  </div>
</template>

<script>

import $ from 'jquery';
import firebase from 'firebase';
import Vuex from 'vuex';

export default {
  name: 'App',
  data () {
    return {
      userLoggedIn: false,
      userID: null,
    }
  },
  created() {
    this.checkLoggedIn();
  },
  filters: {

  },
  methods: {
    checkLoggedIn() {
      var self = this;
      if(firebase.auth().currentUser.uid) {
        self.userID = firebase.auth().currentUser.uid;
        self.$store.commit('userIsLoggedIn');
        var database = firebase.database();
        var ref = database.ref('users/' + self.userID);
        ref.on("value", function(snapshot) {
          self.$store.commit('setUsername', snapshot.val().username);
        });
      }
    },
  }
}

</script>

<style>
html, body {
  /* changed display to table to make body expand if child gets larger, which it does bc we're loading images */
  display: block;
  height: 100%;
  width: 100%;
  margin: 0px;
  padding-bottom: 1%;
  background: #373837;
}
#app {
  height: 100%;
  width: 100%;
  font-family: 'Work Sans', sans-serif;
}
</style>
