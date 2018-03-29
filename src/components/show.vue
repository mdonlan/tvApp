<template>
  <div class="wrapper">
    <img class="showImg" v-if="show" v-bind:src="'https://image.tmdb.org/t/p/original' + show.backdrop_path">
    <div class="showDetails" v-if="show">
      <div class="showDetailsTop">
        <div class="left">
          <img class="showPosterImg" v-if="show" v-bind:src="'https://image.tmdb.org/t/p/w185' + show.poster_path">
        </div>

        <div class="center">
          <div class="showName">{{show.name}}</div>
          <div class="showOverview">{{show.overview}}</div>
        </div>

        <div class="right">
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Series Premiere</div>
            <div class="showDetailsItemRight">{{show.first_air_date}}</div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Episode Runtime</div>
            <div class="showDetailsItemRight">{{show.episode_run_time[0]}}min</div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Genre</div>
            <div class="showDetailsItemRight" v-for="genre in show.genres">
              {{genre.name}}
            </div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Created By: </div>
            <div class="showDetailsItemRight" v-for="creator in show.created_by">
              <div>{{creator.name}}</div>
            </div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Most Recent Air Data</div>
            <div class="showDetailsItemRight">{{show.last_air_date}}</div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Network</div>
            <div class="showDetailsItemRight" v-for="network in show.networks">
              {{network.name}}
            </div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Number of Episodes</div>
            <div class="showDetailsItemRight">{{show.number_of_episodes}}</div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Number of Seasons</div>
            <div class="showDetailsItemRight">{{show.number_of_seasons}}</div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Show Status</div>
            <div class="showDetailsItemRight">{{show.status}}</div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Show Type</div>
            <div class="showDetailsItemRight">{{show.type}}</div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Show Score</div>
            <div class="showDetailsItemRight">{{show.vote_average}}/10</div>
          </div>
          <div class="seriesDetailsRight">
            <div class="showDetailsItemLeft">Show # Votes</div>
            <div class="showDetailsItemRight">{{show.vote_count}}</div>
          </div>
        </div>
      </div>

      <div class="addToFavoritesButton" v-if="showIsNotFavorite" v-on:click="addToFavorites">Add to favorites</div>
      <div class="removeFromFavoritesButton" v-if="showIsFavorite" v-on:click="removeFromFavorites">Remove from favorites</div>
      
      <div class="seasonsTitle">Seasons</div>
      <div class="seasonsContainer" v-if="numSeasons" v-on:click="toggleList($event)"> 
        <div class="season"v-for="season in seasons">
          <div class="clickZone" v-on:click="goToSeason($event)"></div>
          <div class="seasonTitle list-item">Season {{season.season_number}}</div>
          <img class="seasonImg" v-bind:src="'https://image.tmdb.org/t/p/original' + season.poster_path">
        </div>
    </div>

    <div class="castTitle">Cast</div>
    <div class="castContainer">
      <div class="castMember" v-for="castMember in cast">
        <div class="castText">
          <div>{{castMember.name}} as</div>
          <div>{{castMember.character}}</div>
        </div>
        <img class="castMemberImg" v-bind:src="'https://image.tmdb.org/t/p/w185' + castMember.profile_path">
      </div>
    </div>
    
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import firebase from 'firebase';
import Vuex from 'vuex';

export default {
  name: 'show',
  data () {
    return {
      show: null,
      showID: null,
      numSeasons: null,
      seasons: null,
      loggedIn: false,
      userID: '',
      favorites: [],
      showIsFavorite: false,
      showIsNotFavorite: false,
      favoritesPromiseReturned: false,
      showPromiseReturned: false,
      cast: null,
    }
  },
  created() {
    this.checkForShowID();
    this.checkLoggedIn();
  },
  filters: {
    checkIfOverTen: function (string) {
      var oldString = string;
      if(string < 10) {
        string = '0' + oldString;
        return string
      } else {
        return string
      }
    },
  },
  methods: {
    checkLoggedIn() {
      var self = this;
      firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        //console.log('no user logged in');
      } else if(user) {
          //console.log('user logged in');
        self.loggedIn = true;
        self.userID = firebase.auth().currentUser.uid;
        self.getFavorites();
        }
      });
    },
    getFavorites() {
      var self = this;
      // set favorites data
      var database = firebase.database();
      var ref = database.ref('users/' + self.userID);
      var refFavorites = database.ref('users/' + self.userID + "/favorites");
      self.favorites = [];
      ref.on("child_added", function(snapshot) {
        var favData = snapshot.val();
        if(typeof favData == 'object') {
          $.each(favData, function(key, value) {
            var favObj = {
              favID: key,
              name: value.showName
            }
            self.favorites.push(favObj);
          });
        self.favoritesPromiseReturned = true;
        self.checkIfFavorite(); 
        }
        
      });
    },
    checkIfFavorite() {
      var self = this;
      self.showIsNotFavorite = false;
      self.showIsFavorite = false;
      if(self.showPromiseReturned && self.favoritesPromiseReturned) {;
        // check if this show is already a favorite
        if(self.loggedIn) {
          for(var i = 0; i < self.favorites.length; i++) {
            if(self.show.name == self.favorites[i].name) {
              self.showIsFavorite = true;
              self.showIsNotFavorite = false;
            }
            if(i == self.favorites.length - 1) {
              if(self.showIsFavorite == false) {
                // if at end of check loop and still no match
                // add to favorites btn to display
                self.showIsNotFavorite = true;
                self.showIsFavorite = false;
              }
            }
          }
        } else {
          console.log('no show')
        }
      }
    },
    checkForShowID() {
      var self = this;

      // check if params are defined
      // params won't be defined if user enters text directly 
      // or if user reloads
      // if params are undefefined then get id using url query
      if(typeof this.$route.params.id != 'undefined') {
        self.showID = this.$route.params.id;
        this.loadShowData();
      } else {
        var showName = this.$route.query.name;
        axios({
          method:'get',
          url:'https://api.themoviedb.org/3/search/tv?api_key=75234636e15f7c2463efbf69fd35b291&query=' + showName,
        })
        .then(function(response) {
          self.showID = response.data.results[0].id;
          self.loadShowData();
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    loadShowData() {
      var self = this;
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/tv/' + self.showID + '?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response=credits',
      })
      .then(function(response) {
        self.show = response.data;
        self.showPromiseReturned = true;
        self.cast = response.data.credits.cast;
        //self.checkIfFavorite();
        self.getFavorites();
        self.numSeasons = self.show.seasons.length;
        self.getSeasonData();
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    getSeasonData() {
      var self = this;
      var seasonsToAppend = '';
      var seasonsToAppendPart2 = '';
      // allows you to request all seasons with one call
      // might only work up to 20 seasons -- CHECK
      for(var i = 0; i < self.numSeasons; i++) {
        if(i >= 20) {
          seasonsToAppendPart2 += 'season/' + i + ',';
        } else {
          seasonsToAppend += 'season/' + i + ',';
        }
      }
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/tv/' + self.showID + '?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response=' + seasonsToAppend,
      })
      .then(function(response) {
        self.seasons = [];
        for(var j = 0; j < self.numSeasons; j++) {
          if(response.data["season/" + j] == undefined) {
            // if season is missing, then skip
            // some shows don't have a seasons zero, others do
            continue;
          }
          self.seasons.push(response.data["season/" + j])
        }
        // if more than 20 seasons then run a second request for seasons over 20
        if(self.numSeasons > 20) {
          axios({
            method:'get',
            url:'https://api.themoviedb.org/3/tv/' + self.showID + '?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response=' + seasonsToAppendPart2,
          })
          .then(function(response) {
            for(var k = 0; k < self.numSeasons; k++) {
              if(response.data["season/" + k] == undefined) {
                // if season is missing, then skip
                // some shows don't have a seasons zero, others do
                continue;
              }
              self.seasons.push(response.data["season/" + k])
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    toggleList(event) {
      // on click toggle visibilty of list children
      var targetClass = event.target.classList[0];

      if(targetClass == "seasonsTitle") {
        //var toggleElem = $(".seasonsContainer");
        var overlayElem = $(".seasonsContainer");
      } else if(targetClass == "seasonImg") {
        // create overlay of season with eppisodes listed
        var overlayElem = event.target.nextElementSibling;
      } else if(targetClass == "episode") {
        var toggleElem = event.target.children[0];
      } else if(targetClass == "overlayBackground") {
          // if user clicks on the background while the overlay
          // is active and the background is dimmed
          // exit the overlay and remove the dim
          $(".eachSeasonsEpisodes").each(function() {
            if($(this).hasClass("overlay")) {
              $(this).removeClass("overlay");
            }
            if($(".overlayBackground").hasClass("dim")) {
              $(".overlayBackground").removeClass("dim");
            }
          });
      }
      
      // check if toggle elem has been set, not all clicks set it
      if(typeof toggleElem != 'undefined') {
        $(toggleElem).toggleClass("hidden");
      } else if(typeof overlayElem != 'undefined') {
        $(overlayElem).toggleClass("overlay");
        $(".overlayBackground").toggleClass("dim");
      }
    },
    addToFavorites() { 
      var self = this;
      var database = firebase.database();
      var ref = database.ref('users/' + self.userID);
      var refFavorites = database.ref('users/' + self.userID + "/favorites");

      if(self.favorites.length == 0) {
        database.ref('users/' + self.userID + '/favorites').push({
          "showName": self.show.name,
          "showID": self.showID,
        });
      } else {
        var foundMatch = false;
        for(var i = 0; i < self.favorites.length; i++) {
          if(self.favorites[i] == self.show.name) {
            console.log('found a match');
            foundMatch = true;
          } 
          if(i == self.favorites.length - 1 && foundMatch == false) {
            console.log('didnt find a match')
            database.ref('users/' + self.userID + '/favorites').push({
              "showName": self.show.name,
              "showID": self.showID,
            });
          }
        }
      }
      //self.checkIfFavorite();
      self.getFavorites();
    },
    removeFromFavorites() {
      var self = this;
      var database = firebase.database();
      var refFavorites = database.ref('users/' + self.userID + "/favorites/");
      //refFavorites.child('users/' + self.userID + '/favorites').remove();
      for(var i = 0; i < self.favorites.length; i++) {
        if(self.show.name == self.favorites[i].name) {
          var favID = self.favorites[i].favID;
          console.log('found match')
        }
      }
      refFavorites.child(favID).remove();
      //self.checkIfFavorite();
      self.getFavorites();
    },
    goToSeason(event) {
      var self = this;
      var seasonClicked = event.target.nextElementSibling.textContent;
      seasonClicked = seasonClicked.split("Season ");
      self.$router.push({
        name: 'season', 
        query: {show: self.show.name, season: seasonClicked[1], id: self.showID}, 
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
  height: 3000px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.showImg {
  width: 100%;
  position: absolute;
  z-index: 0;
  max-height: 100%;
}

.showPosterImg {
  
}

.showName {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 25px;
}

.showOverview {
  width: 50%;
}

.showDetails {
  height: 1000px;
  width: 100%;
  background: #373837;
  margin-top: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #dddddd;
  z-index: 1;
}

.showDetailsTop {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;
}

.left, .right, .center {
  width: 33%;
  height: 100%;
  display: flex;
}

.left {
  justify-content: flex-end;
  padding-right: 5%;
}

.right {
  display: flex;
  flex-direction: column;
}

.center {
  
  flex-direction: column;
  padding-left: 5%;
}

.seasonsContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.season {
  margin-bottom: 10px;
  margin: 5px;
  cursor: pointer;
  position: relative;
}

.seasonTitle {
  width: 100%;
  text-align: center;
}

.seasonImg {
  height: 200px;
  width: 150px;
}

.episode {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.hidden {
  display: none;
}

.list-item {
  
}

.episodeOverview {
  width: 50%;
}

.episodeTextSection, .episodeImgSection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlay {
  display: flex;
  flex-direction: column;
  position: fixed;
  background: #111111;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 50%;
  height: 500px;
  overflow: auto;
  color: #dddddd;
  padding: 3px;
}

.overlayBackground {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -10;
}

.dim {
  height: 100%;
  width: 100%;
  position: fixed;
  background: #111111;
  opacity: 0.9;
  z-index: 0;
}

.seriesDetailsRight {
  display: flex;
  margin-bottom: 5px;
}

.showDetailsItemLeft, .showDetailsItemRight {
  width: 25%;
}

.showDetailsItemLeft {
  text-align: start;
}

.showDetailsItemRight {
  text-align: end;
}

.addToFavoritesButton, .removeFromFavoritesButton {
  margin-top: 75px;
  margin-bottom: 25px;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.addToFavoritesButton {
  background: #229953;
}

.removeFromFavoritesButton {
  background: #c22828;
}

.clickZone {
  position: absolute;
  height: 100%;
  width: 100%;
}

.castContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
}

.castMember {
  position: relative;
}

.castText {
  position: absolute;
  background: rgba(34, 34, 34, 0.9);
  width: 100%;
  bottom: 0px;
  text-align: center;
  font-size: 12px;
}

.castTitle, .seasonsTitle {
  margin-top: 50px;
  font-size: 24px;
  margin-bottom: 10px;
}

</style>
