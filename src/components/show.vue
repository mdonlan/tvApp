<template>
  <div class="wrapper">
    <img class="showImg" v-bind:src="'https://image.tmdb.org/t/p/original' + show.backdrop_path">
    <div class="showDetails" v-if="show">
      <div class="showName">{{show.name}}</div>
      <div class="showOverview">{{show.overview}}</div>
      <div class="seasonsContainer" v-if="numSeasons" v-on:click="toggleList($event)"> 
      <div class="eachSeason">
        <div class="season" v-for="season in seasons">
          <div class="seasonTitle list-item">Season {{season.season_number}}</div>
          <img class="seasonImg" v-bind:src="'https://image.tmdb.org/t/p/original' + season.poster_path">
          <div class="eachSeasonsEpisodes hidden">
            <div class="seasonTitle">Season {{season.season_number}}</div>
            <div class="episode list-item" v-for="episode in season.episodes">
              {{episode.name}} ({{episode.season_number}}x{{episode.episode_number | checkIfOverTen}})
              <div class="overview hidden">
                {{episode.overview}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overlayBackground"></div>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'show',
  data () {
    return {
      show: null,
      showID: null,
      numSeasons: null,
      seasons: null,
    }
  },
  created() {
    this.checkForShowID();
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
        url:'https://api.themoviedb.org/3/tv/' + self.showID + '?api_key=75234636e15f7c2463efbf69fd35b291',
      })
      .then(function(response) {
        self.show = response.data;
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
      // allows you to request all seasons with one call
      // might only work up to 20 seasons -- CHECK
      for(var i = 0; i < self.numSeasons; i++) {
        seasonsToAppend += 'season/' + i + ',';
      }
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/tv/' + self.showID + '?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response=' + seasonsToAppend,
      })
      .then(function(response) {
        self.seasons = [];
        for(var j = 0; j < self.numSeasons; j++) {
          self.seasons.push(response.data["season/" + j])
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    toggleList(event) {
      // on click toggle visibilty of list children
      //console.log(event.target)
      var targetClass = event.target.classList[0];

      if(targetClass == "seasonsTitle") {
        var toggleElem = $(".eachSeason");
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
            console.log('testing')
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.showImg {
  width: 100%;
  position: absolute;
  z-index: -1;
  max-height: 100%;
}

.showName {

}

.showOverview {
  width: 50%;
}

.showDetails {
  height: 100%;
  width: 100%;
  background: aqua;
  margin-top: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.eachSeason {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.season {
  background: gray;
  margin-bottom: 10px;
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
  background: lightblue;
  margin-bottom: 10px;
}

.hidden {
  display: none;
}

.list-item {
  cursor: pointer;
}

.overview {
  cursor: auto;
  background: lightgreen;
  margin-bottom: 10px;
}

.overlay {
  display: flex;
  flex-direction: column;
  position: absolute;
  background: red;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 500px;
}

.overlayBackground {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -10;
}

.dim {
  background: #111111;
  opacity: 0.9;
  z-index: 0;
}

</style>
