<template>
  <div id="app">
    <topNav></topNav>
    <router-view :key="$route.fullPath"></router-view>
    
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
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
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
      // handle the scroll events to change the topnav styling

      let topNav = document.querySelector(".topNavWrapper");
      let searchInput = document.querySelector(".searchInput");
      let onPage = null;

      let url = window.location.href;
      if(url.includes("show")) {
        if(window.scrollY > 650) {
          topNav.style.background = '#222222';
          searchInput.style.background = '#dddddd';
          searchInput.style.color = '#222222';
        } else {
          topNav.style.background = '';
          searchInput.style.background = '';
          searchInput.style.color = '';
        }
      } else {
        // default
        if(window.scrollY > 100) {
          topNav.style.background = '#222222';
          searchInput.style.background = '#dddddd';
          searchInput.style.color = '#222222';
        } else {
          topNav.style.background = '';
          searchInput.style.background = '';
          searchInput.style.color = '';
        }
      }

      
    }
  }
}

</script>

<style>
html, body {
  margin: 0px;
  background-color: #222222;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Work Sans', sans-serif;
  margin-top: 60px;
  background-image: url("./Assets/8.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
