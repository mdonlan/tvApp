<template>
  <div class="topNavWrapper">
    <div class="left"><router-link class="homeBtn" to="/">Home</router-link></div>
    <div class="center">
      <search></search>
    </div>
    <div class="right">
      <router-link v-if="!this.$store.state.userLoggedIn" class="loginBtn" to="/login">Login</router-link>
      <router-link v-if="!this.$store.state.userLoggedIn" class="registerBtn" to="/signUp">Register</router-link>
      <router-link v-if="this.$store.state.username" class="userAccountBtn" to="/user">{{this.$store.state.username}}</router-link>
      <div v-if="this.$store.state.userLoggedIn" class="logoutBtn" v-on:click="logOut">Log Out</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import Vuex from 'vuex';
import firebase from 'firebase';

export default {
  name: 'topNav',
  data () {
    return {

    }
  },
  created() {

  },
  filters: {

  },
  methods: {
    logOut() {
      var self = this;
      firebase.auth().signOut().then(() => {
        this.$router.push('login');
        self.$store.commit('logOut');
      })
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.topNavWrapper {
  height: 60px;
  width: 100%;
  background: #111111;
  display: flex;
  color: #dddddd;
  justify-content: center;
}

.left, .center, .right {
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

a, .logoutBtn {
  text-decoration: none;
  color: #dddddd;
  cursor: pointer;
  height: 25px;
  width: 75px;
  border: 1px solid #dddddd;
  text-align: center;
  line-height: 25px;
  margin-left: 5px;
  margin-right: 5px;
  transition: 0.5s all;
}

a:hover {
  color: #111111;
  background: #dddddd;
}

.logoutBtn:hover {
  color: #dddddd;
  background: #b91414;
}

</style>
