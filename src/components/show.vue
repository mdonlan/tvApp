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
      
      <div class="seasonsContainer" v-if="numSeasons" v-on:click="toggleList($event)"> 
        <div class="season"v-for="season in seasons">
          <div class="seasonTitle list-item">Season {{season.season_number}}</div>
          <img class="seasonImg" v-bind:src="'https://image.tmdb.org/t/p/original' + season.poster_path">
          <div class="eachSeasonsEpisodes hidden">
            <div class="seasonTitle">Season {{season.season_number}}</div>
            <div class="episode" v-for="episode in season.episodes">
              <div class="episodeImgSection">
                <img class="episodeImg" v-bind:src="'https://image.tmdb.org/t/p/w185' + episode.still_path">
              </div>
              <div class="episodeTextSection">
                <div>
                  {{episode.name}} ({{episode.season_number}}x{{episode.episode_number | checkIfOverTen}})
                </div>
                <div class="episodeOverview">
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
      })
      .catch(function (error) {
        console.log(error);
      });
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
    },
    toggleList(event) {
      // on click toggle visibilty of list children
      //console.log(event.target)
      var targetClass = event.target.classList[0];

      if(targetClass == "seasonsTitle") {
        var toggleElem = $(".seasonsContainer");
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
  z-index: -1;
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
  margin-top: 50px;
  width: 50%;
}

.season {
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
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.hidden {
  display: none;
}

.list-item {
  cursor: pointer;
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
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -10;
}

.dim {
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

</style>
