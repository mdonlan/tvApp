<template>
  <div class="loginWrapper">
    <div class="loginContainer">
      <div class="title">Login</div>
      <input class="email" type="text" v-model="email" placeholder="Email">
      <input class="password" type="password" v-model="password" placeholder="Password">
      <div class="loginButton" v-on:click="login">Enter</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import firebase from 'firebase';

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
    }
  },
  created() {

  },
  filters: {

  },
  methods: {
    login() {
      var self = this;
      firebase.auth().signInWithEmailAndPassword(self.email, self.password).then(
        function(user) {
          //alert("welcome " + firebase.auth().currentUser.uid);
          self.$router.push({
            name: 'user'
          });
        },
        function(error) {
          alert("failed to login." + error.message);
        }
      )
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.loginWrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #dddddd;
}

.loginContainer {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 24px;
}

.details {
  margin-top: 10px;
  margin-bottom: 75px;
}

.loginButton {
  margin-top: 10px;
  border: 1px solid #dddddd;
  padding: 7px;
  width: 50%;
  text-align: center;
  color: #dddddd;
  transition: 0.5s all;
  cursor: pointer;
}

.loginButton:hover {
  background: #2fda93;
}

input {
  border: 0;
  padding: 0;
  margin: 10px;
  background: transparent;
  text-align: center;
  font-size: 18px;
  width: 50%;
  color: #dddddd;
}


.email, .password {
  border: 1px solid #dddddd;
  padding: 5px;
}


</style>
