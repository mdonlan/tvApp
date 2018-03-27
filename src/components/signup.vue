<template>
  <div class="signUpWrapper">
    <div class="signUpContainer">
      <div class="title">Create an account</div>
      <div class="details">Having an account allows you to add shows to your favorites and track them to make sure you never miss an episode!</div>
      <input class="email" type="text" v-model="email" placeholder="Email">
      <input class="password" type="password" v-model="password" placeholder="Password">
      <div class="signUpButton" v-on:click="createAccount">Create Account</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import firebase from 'firebase';

export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: '',
      username: '',
      userID: null,
    }
  },
  created() {

  },
  filters: {

  },
  methods: {
    createAccount() {
      var self = this;
      firebase.auth().createUserWithEmailAndPassword(self.email, self.password).then(
        function(user) {
          // on successful account creation add the user to the db
          self.userID = firebase.auth().currentUser.uid;
          var database = firebase.database();
          self.username = self.email.substring(0, self.email.indexOf("@"));
          //console.log(database);
          firebase.database().ref('users/' + self.userID).set({
          username: self.username,
          email: self.email
          });
        },
        function(error) {
          alert('Opps.' + error.message);
        }
      )
    },
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.signUpWrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #dddddd;
}

.signUpContainer {
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signUpButton {
  margin-top: 10px;
  border: 1px solid #dddddd;
  padding: 7px;
  text-align: center;
  transition: 0.5s all;
  cursor: pointer;
  width: 50%;
}

.signUpButton:hover {
  background: #2fda93;
}

.title {
  font-size: 24px;
}

.details {
  margin-top: 10px;
  margin-bottom: 75px;
}

.email, .password {
  border: 1px solid #dddddd;
  padding: 5px;
}

input {
  border: 0;
  padding: 0;
  margin: 10px;
  background: transparent;
  text-align: center;
  color: #dddddd;
  font-size: 18px;
  width: 50%;
}

</style>
