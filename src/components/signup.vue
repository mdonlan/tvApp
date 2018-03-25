<template>
  <div class="signUpWrapper">
    <input type="text" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <div v-on:click="createAccount">Create Account</div>
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



</style>
