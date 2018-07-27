<template>
  <div class="topNavWrapper">
    <div class="left"><router-link class="homeBtn button" to="/">Home</router-link></div>
    <div class="center">
      <search></search>
      <div class="hamburgerButton" v-on:click="showMobileMenu">
        <i class="fas fa-bars"></i>
      </div>
    </div>
    <div class="right">
      <router-link v-if="!this.$store.state.userLoggedIn" class="loginBtn button" to="/login">Login</router-link>
      <router-link v-if="!this.$store.state.userLoggedIn" class="registerBtn button" to="/signUp">Register</router-link>
      <router-link v-if="this.$store.state.username" class="userAccountBtn button" to="/tracking">Tracker</router-link>
      <div v-if="this.$store.state.userLoggedIn" class="logoutBtn button" v-on:click="logOut">Log Out</div>
    </div>

    <!-- only displays when screen size is small enough -->
    <div class="mobileMenu">
      <div class="mobileMenuTop">
        <i class="fas fa-times closeButton" v-on:click="hideMobileMenu"></i>
      </div>
      <router-link class="mobileButton" to="/" @click.native="hideMobileMenu">Home</router-link>
      <router-link v-if="!this.$store.state.userLoggedIn" class="mobileButton" to="/login" @click.native="hideMobileMenu">Login</router-link>
      <router-link v-if="!this.$store.state.userLoggedIn" class="mobileButton" @click.native="hideMobileMenu" to="/signUp">Register</router-link>
      <router-link v-if="this.$store.state.username" class="mobileButton" @click.native="hideMobileMenu" to="/user">{{this.$store.state.username}}</router-link>
      <div v-if="this.$store.state.userLoggedIn" class="logoutBtn mobileButton" v-on:click="logOut">Log Out</div>
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
  mounted() {

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
      this.hideMobileMenu();
    },

    showMobileMenu() {
      let mobileMenu = document.querySelector(".mobileMenu");
      mobileMenu.classList.add('mobileMenuShow');
    },

    hideMobileMenu() {
      console.log('hiding')
      // toggle display mobile menu
      let mobileMenu = document.querySelector(".mobileMenu");
      mobileMenu.classList.remove('mobileMenuShow');
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.topNavWrapper {
  height: 60px;
  width: 100%;
  background: rgba(34, 56, 102, 0.99);
  display: flex;
  color: #dddddd;
  justify-content: center;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 2;
  -webkit-box-shadow: 0px 5px 10px 2px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 5px 10px 2px rgba(0,0,0,0.75);
  box-shadow: 0px 5px 10px 2px rgba(0,0,0,0.75);
  transition: 1s;
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

.button {
  border-radius: 2px;
}

.mobileMenu {
  display: none;
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(34, 34, 34, 0.9);
  z-index: 3;
}

.hamburgerButton {
  display: none;
}

@media screen and (max-width: 480px) {
  .left, .right {
    display: none;
  }

  .center {
    width: 100%;
  }

  .hamburgerButton {
    display: block;
    width: 25%;
    text-align: center;
  }

  .mobileMenuShow {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .mobileButton {
    height: 25px;
    width: 50%;
    border: 1px solid #dddddd;
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .mobileMenuTop {
    height: 50px;
    width: 100%;
    background:#222222;
    position: absolute;
    top: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .closeButton {
    color: #dddddd;
    margin-right: 15px;
  }
}

</style>
