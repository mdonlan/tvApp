<template>
  <div id="app">
    <topNav></topNav>
    <router-view/>
    <footerComponent></footerComponent>
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
  mounted() {
    console.log('running mounted');
    window.addEventListener("scroll", this.handleScroll);
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
            //console.log(favData)
            var favObj = {
              showID: value.showID,
              name: value.showName,
              dbID: key,
            }
            favorites.push(favObj);
          });
        }
        self.$store.commit('setFavorites', favorites);
      });
    },
    handleScroll(event) {
      let topNav = document.querySelector(".topNavWrapper");

      if(window.scrollY > 650) {
        topNav.style.background = '#222222';
      } else {
        topNav.style.background = '';
      }
    }
  }
}

</script>

<style>
html, body {
  margin: 0px;
  background-color: #1d1d1d;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Work Sans', sans-serif;
  margin-top: 60px;
}
</style>
