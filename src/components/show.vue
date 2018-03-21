<template>
  <div class="wrapper">
    <div class="showOverview" v-if="show">
      <div>{{show.name}}</div>
      <div>{{show.overview}}</div>
    </div>
    <div class="seasons" v-if="numSeasons" v-on:click="toggleList($event)"> 
      <div class="seasonsTitle list-item">Seasons</div>
      <div class="eachSeason hidden">
        <div class="season" v-for="season in seasons">
          <div class="seasonTitle list-item">Season {{season.season_number}}</div>
          <div class="eachSeasonsEpisodes hidden">
            <div class="episode list-item" v-for="episode in season.episodes">
              {{episode.name}} ({{episode.season_number}}x{{episode.episode_number | checkIfOverTen}})
              <div class="overview hidden">
                {{episode.overview}}
              </div>
            </div>
          </div>
        </div>
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
      console.log(event.target)
      var targetClass = event.target.classList[0];

      if(targetClass == "seasonsTitle") {
        var toggleElem = $(".eachSeason");
      } else if(targetClass == "seasonTitle") {
        var toggleElem = event.target.nextElementSibling;
      } else if(targetClass == "episode") {
        var toggleElem = event.target.children[0];
      }
      
      
      $(toggleElem).toggleClass("hidden");
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

.showOverview {
  height: 50%;
  width: 50%;
  background: aqua;
}

.season {
  background: gray;
  margin-bottom: 10px;
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

</style>
