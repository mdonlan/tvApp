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
      // checks if there is a user logged in
      firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        //console.log('no user logged in');
      } else if(user) {
          //console.log('user logged in');
          self.userID = firebase.auth().currentUser.uid;
          self.$store.commit('userIsLoggedIn');
          var database = firebase.database();
          var ref = database.ref('users/' + self.userID);
          ref.on("value", function(snapshot) {
            var data = {
              username: snapshot.val().username,
              userID: self.userID
            }
            self.$store.commit('setUsernameAndID', data);
            self.getFavorites();
          });
        }
      });
    },
    getFavorites() {
      var self = this;
      var database = firebase.database();
      //console.log(this.$store.state.userID)
      var ref = database.ref('users/' + this.$store.state.userID);
      var refFavorites = database.ref('users/' + this.$store.state.userID + "/favorites");
      var favorites = [];
      ref.on("child_added", function(snapshot) {
        var favData = snapshot.val();
        if(typeof favData == 'object') {
          $.each(favData, function(key, value) {
            var favObj = {
              favID: key,
              name: value.showName
            }
            favorites.push(favObj);
          });
        }
        self.$store.commit('setFavorites', favorites);
      });
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
