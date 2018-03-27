<template>
  <div class="topNavWrapper">
    <div class="left">left</div>
    <div class="center">center</div>
    <div class="right">
      <router-link v-if="!this.$store.state.userLoggedIn" class="loginBtn" to="/login">Login</router-link>
      <router-link v-if="!this.$store.state.userLoggedIn" class="registerBtn" to="/signUp">Register</router-link>
      <router-link v-if="this.$store.state.userLoggedIn" class="userAccountBtn" to="/user">{{this.$store.state.username}}</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import Vuex from 'vuex';

export default {
  name: 'topNav',
  data () {
    return {

    }
  },
  created() {
    this.checkIfLoggedIn();
  },
  filters: {

  },
  methods: {
    checkIfLoggedIn() {
      var self = this;
      console.log(self.$store.state.userLoggedIn)
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.topNavWrapper {
  height: 40px;
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

a {
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

</style>
