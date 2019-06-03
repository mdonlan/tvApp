<template>
    <div id="app">
        <topNav />
        <router-view :key="$route.fullPath" />
        <Footer />
    </div>
</template>

<script>
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

    methods: {
        checkLoggedIn() {
            // checks if there is a user logged in
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    //console.log('no user logged in');
                } else if(user) {
                    //console.log('user logged in');
                    this.userID = firebase.auth().currentUser.uid;
                    this.$store.commit('userIsLoggedIn');

                    firebase.database().ref('users/' + this.userID)
                    .on("value", (snapshot) => {
                        const data = {
                            username: snapshot.val().username,
                            userID: this.userID
                        };
                        this.$store.commit('setUsernameAndID', data);
                        this.getFavorites();
                    });
                }
            });
        },

        getFavorites() {
            // load user favorite shows from firebase db
            let favoriteShows = [];

            firebase.database().ref('users/' + this.$store.state.userID + '/favorites')
            .once('value', (data) => {
                data.forEach((fav) => {
                    let newFav = {
                        showID: fav.val().showID,
                        name: fav.val().showName,
                        dbID: fav.key
                    };
                    favoriteShows.push(newFav);
                });
                this.$store.commit('setFavorites', favoriteShows);
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
