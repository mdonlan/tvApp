<template>
  <div class="wrapper">
      
      <div class="title">Favorite Shows</div>
      <div class="favoriteContainer" v-if="this.$store.state.favorites">
        <div class="favoriteShow" v-for="show in favorites">
          <div class="favoriteShowName">{{show.name}}</div>
          <div class="favoriteShowRight">
            <div class="viewBtn btn" v-on:click="viewShow($event)">View</div>
            <div class="removeBtn btn">Remove</div>
          </div>
        </div>
      </div>

      <div class="calendarContainer">
        <div class="day" v-for="day in days">
          <div class="dayTitle">{{day.fullDate}}</div>
          <div class="dayShows" v-if="day.thisDaysShows">
            <div class="show" v-for="show in day.thisDaysShows">
              <div class="left">
                <div class="showName">{{show.showName}}</div>
                <div class="episodeName">{{show.name}}</div>
              </div>
              <div class="right">
                <div>{{show.airTime}}</div>
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
import firebase,{ app } from 'firebase';

export default {
  name: 'user',
  data () {
    return {
      days: [],
    }
  },
  created() {
    this.getDate();
    //this.findNextAirDate();
    if(this.$store.state.favorites.length > 0) {
      console.log('testing');
      this.findNextAirDate();
    } else {
      this.$store.watch(
        (state)=>{
          return this.$store.state.favorites // could also put a Getter here
        },
        (oldValue, newValue)=>{
        //something changed do something
        //console.log(oldValue)
        //console.log(newValue)
        this.findNextAirDate();
        },
        //Optional Deep if you need it
        {
          deep:true
        }
      )
    }
  },
  filters: {

  },
  computed: {
    favorites: function() {
      return this.$store.state.favorites;
    }
  },
  methods: {
    getDate() {
      var self = this;
      for(var i = -3; i < 4; i++) {
        var tempDate = new Date();
        tempDate.setDate(tempDate.getDate() + i);
        var date = tempDate.getDate();
        var month = tempDate.getMonth();
        var day = tempDate.getDay();
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        var fullDate = days[day] + ' ' + months[month] + ' ' + date;
        var day = {
          fullDate: fullDate,
          date: tempDate,
          dayNum: i,
        }
        self.days.push(day);
      }
    },
    findNextAirDate() {
      var self = this;
      var appendData = this.$store.state.favorites[0].showID;
      for(var i = 0; i < this.$store.state.favorites.length; i++) {
        axios({
        method:'get',
        url:'http://api.themoviedb.org/3/tv/' + this.$store.state.favorites[i].showID + '?api_key=75234636e15f7c2463efbf69fd35b291',
        })
        .then(function(response) {
          //console.log(response)
          // on show details promise return
          // get season details
          var onSeason = response.data.number_of_seasons;
          var showID = response.data.id;
          var showName = response.data.name;
          axios({
            method:'get',
            url:'http://api.themoviedb.org/3/tv/' + showID + '/season/' + onSeason + '?api_key=75234636e15f7c2463efbf69fd35b291',
          })
          .then(function(response) {
            // based on current date find which episode is closest
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var episodes = response.data.episodes;
            var date = new Date();
            var weeklyEpisodes = [];
            for(var j = 0; j < episodes.length; j++) {
              var episodeDate = new Date(episodes[j].air_date)
              var daysDiff = Math.round(Math.abs((date.getTime() - episodeDate.getTime())/(oneDay)));
              if(daysDiff <= 3) {
                episodes[j].showName = showName;
                episodes[j].showID = showID;
                weeklyEpisodes.push(episodes[j]);
              }
            }
            
            // after finding all episodes airing this week 
            // display them
            //console.log(weeklyEpisodes);
            self.displayEpisodes(weeklyEpisodes);
            
          })
          .catch(function (error) {
            console.log(error);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    displayEpisodes(weeklyEpisodes) {
      var self = this;
      var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      $.each(self.days, function(index, value) {
        for(var i = 0; i < weeklyEpisodes.length; i++) {
          var airdate = new Date(weeklyEpisodes[i].air_date);
          var date = airdate.getDate();
          var month = airdate.getMonth();
          var day = airdate.getDay();
          var fullAirDate = days[day] + ' ' + months[month] + ' ' + date;
          if(value.fullDate == fullAirDate) {
            //console.log(index)
            if(typeof self.days[index].thisDaysShows == 'undefined') {
              self.$set(self.days[index], 'thisDaysShows', [])
            }
            
            self.days[index].thisDaysShows.push(weeklyEpisodes[i]);
            var lastAdded = self.days[index].thisDaysShows.length - 1;
            //self.days[index].push(weeklyEpisodes[i]);
            self.getShowTimes(value, index, weeklyEpisodes[i], lastAdded);
          } else {

          }
        }
      });
    },
    getShowTimes(value, index, onShow, onShowIndex) {
      var self = this;
      //http://api.tvmaze.com/search/shows?q=girls
      var showID = '';
      for(var i = 0; i < value.thisDaysShows.length; i++) {
        if(value.thisDaysShows[i].showName == onShow.showName) {
          showID = value.thisDaysShows[i].showID;
        }
      }
      axios({
        method:'get',
        url:'https://api.themoviedb.org/3/tv/' + showID + '/external_ids?api_key=75234636e15f7c2463efbf69fd35b291',
      })
      .then(function(response) {
        var imdbID = response.data.imdb_id;
        axios({
          method:'get',
          url:'http://api.tvmaze.com/lookup/shows?imdb=' + imdbID,
        })
        .then(function(response) {
          //console.log(response);
          
          var airTime = parseInt(response.data.schedule.time);
          if(airTime > 12) {
            airTime = airTime - 12;
            airTime.toString();
            airTime += 'PM';
          } else {
            airTime.toString();
            airTime += 'AM';
          }
          //self.$set(self.days[index].thisDaysShows[onShowIndex], 'airTime', '')
          //self.$set(self.days[index], 'thisDaysShows', [])
          //console.log(onShowIndex)
          self.$set(self.days[index].thisDaysShows[onShowIndex], 'airTime', '')
          self.days[index].thisDaysShows[onShowIndex].airTime = airTime;
         
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    viewShow(event) {
      var self = this;
      var elem = event.target;
      var showName = elem.parentElement.previousElementSibling.textContent
      //console.log(elem.parentElement.previousElementSibling.textContent);
      self.$router.push({
        name: 'show', 
        query: {name: showName}, 
      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
  height: 100%;
  width: 100%;
  color: #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  font-size: 24px;
}

.favoriteContainer {
  margin-top: 55px;
  margin-bottom: 55px;
  display: flex;
  flex-direction: column; 
  width: 80%;
  align-items: center;
}

.favoriteShow {
  display: flex;
  justify-content: space-between;
  width: 300px;
  border: 1px solid #dddddd;
  padding: 5px;
}

.favoriteShowRight {
  display: flex;
}

.btn {
  border: 1px solid #dddddd;
  padding: 3px;
  margin: 5px;
  cursor: pointer;
}

.viewBtn {
  background: rgba(23, 84, 197, 0.5);
}

.viewBtn:hover {
  background: rgba(23, 84, 197, 1.0);
}

.removeBtn {
  background: rgba(219, 81, 39, 0.5);
}

.calendarContainer {
  height: 500px;
  width: 80%;
  display: flex;
}

.day {
  height: 100%;
  width: 14.3%;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dayTitle {
  border-bottom: 1px solid #dddddd;
}

.dayShows {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.show {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 10px);
  padding: 5px;
}

.showName {
  font-size: 14px;
}

.episodeName {
  font-size: 10px;
}

</style>
