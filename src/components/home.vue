<template>
  <div class="wrapper">
    <div class="airingTodayTitle title">Airing Today</div>
    <div class="airingTodayContainer container" v-if="airingToday">
        <div class="showContainer" v-for="show in airingToday" v-on:click="goToShowDetails($event, show)">
            <img class="tvImg" v-bind:src="'https://image.tmdb.org/t/p/original' + show.backdrop_path">
            <div class="showText">
                <div class="showName">{{show.name}}</div>
            </div>
            <div class="clickZone"></div>
        </div>
    </div>
    <router-link class="moreButton" :to="{ path: 'airingToday' }">View More</router-link>
    <div class="title">Popular</div> 
    <div class="popularContainer container" v-if="popularTV">
        <div class="showContainer" v-for="show in popularTV" v-on:click="goToShowDetails($event, show)">
            <img class="tvImg" v-bind:src="'https://image.tmdb.org/t/p/original' + show.backdrop_path">
            <div class="showText">
                <div class="showName">{{show.name}}</div>
            </div>
        </div>
    </div>
    <router-link class="moreButton" :to="{ path: 'popular' }">View More</router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'home',
    data () {
        return {
            popularTV: null,
            airingToday: null,
        }
    },

    created() {
        this.requestPopularTV();
        this.requestAiringToday();
    },

    methods: {
        requestPopularTV() {
            let url = 'https://api.themoviedb.org/3/discover/tv?api_key=75234636e15f7c2463efbf69fd35b291&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false';
            axios.get(url)
            .then((response) => {
                // only return the first 9 shows
                this.popularTV = response.data.results.slice(0,9);
            })
            .catch((error) => {console.log(error)});
        },

        requestAiringToday() {
            let url = 'https://api.themoviedb.org/3/tv/airing_today?api_key=75234636e15f7c2463efbf69fd35b291';
            axios.get(url)
            .then((response) => {
                // only return the first 9 shows
                this.airingToday = response.data.results.slice(0,9);
            })
            .catch(function (error) {console.log(error)});
        },

        goToShowDetails(event, show) {
            this.$router.push({
                name: 'show', 
                query: {name: show.name}, 
                params: {id: show.id}
            });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
    width: calc(100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #dddddd;
    min-height: 100%;
    background: rgba(0, 0, 0, 0.75);
    padding-top: 150px;
}

.container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 75%;
    height: 75%;
    min-height: 75%;
}

.showContainer {
    position: relative;
    width: 405px;
    height: 232px;
    cursor: pointer;
    padding: 0px;
    margin: 3px; 
}

.clickZone {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    transition: 0.7s;
    background: #111111;
    opacity: 0;
}

.clickZone:hover {
    opacity: 0.8;
}

.tvImg {
    background: #111111;
    height: 100%;
    width: 100%;
}

.showText {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 25px;
    line-height: 25px;
    background: rgb(34, 56, 102);
}

.showName {
    color: #dddddd;
    text-align: center;
}

.title {
    font-size: 32px;
    font-weight: bold;
    margin-top: 60px;
    margin-bottom: 35px;
}

.moreButton {
    margin-top: 25px;
    margin-bottom: 25px;
    height: 25px;
    width: 100px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #dddddd;
    padding: 15px;
    transition: 1s all;
    border-radius: 3px;
    cursor: pointer;
}

.moreButton:hover {
    background: #dddddd;
    color: #222222;
    width: 150px;
}

a {
    color: #dddddd;
    text-decoration: none;
}

@media screen and (max-width: 480px) {
    .showContainer {
    position: relative;
    height: 100%;
    width: 100%;
    cursor: pointer;
    }
}
</style>