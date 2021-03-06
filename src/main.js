import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import search from './components/search'
import topNav from './components/topNav'
import Footer from './components/Footer'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
let app;
var config = {
    apiKey: "AIzaSyA-rrCEAY3uzNqiRVqpQ8nyrK_NUGwkHG0",
    authDomain: "vue-tv-app.firebaseapp.com",
    databaseURL: "https://vue-tv-app.firebaseio.com",
    projectId: "vue-tv-app",
    storageBucket: "",
    messagingSenderId: "292005833741"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
    if(!app) {
        new Vue({
            el: '#app',
            router,
            store,
            components: { App },
            template: '<App/>'
        })
    }
});

// register components globally
Vue.component('search', search);
Vue.component('topNav', topNav);
Vue.component('Footer', Footer);