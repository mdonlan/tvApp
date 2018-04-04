<template>
  <div class="wrapper">

    <div class="title">Weekly Shows</div>
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
            <div class="clickZone" v-on:click="clickedCalendarShow($event)"></div>
          </div>
        </div>
      </div>
    </div>
      
      <div class="title">Favorite Shows</div>
      <div class="favoriteContainer" v-if="this.$store.state.favorites">
        <div class="favoriteShow" v-for="show in favorites">
          <div class="favoriteShowName">{{show.name}}</div>
          <div class="favoriteShowRight">
            <div class="viewBtn btn" v-on:click="viewShow($event)">View</div>
            <div class="removeBtn btn" v-on:click="removeFromFavorites($event)">Remove</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';
import firebase from 'firebase';

export default {
  name: 'user',
  data () {
    return {
      days: [],
    }
  },
  created() {
    this.getDate();
    if(this.$store.state.favorites.length > 0) {
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
      for(var i = 0; i < this.$store.state.favorites.length; i++) {
        axios({
        method:'get',
        url: 'https://api.tvmaze.com/singlesearch/shows?q=' + this.$store.state.favorites[i].name + '&embed=episodes'
        })
        .then(function(response) {
          var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
          var allEpisodes = response.data._embedded.episodes;
          var showName = response.data.name;
          var date = new Date();
          var weeklyEpisodes = [];
          
          for(var j = 0; j < allEpisodes.length; j++) {
            var episodeDate = new Date(allEpisodes[j].airdate)
            var daysDiff = Math.round(Math.abs((date.getTime() - episodeDate.getTime())/(oneDay)));
            
            if(daysDiff <= 10) {
              allEpisodes[j].showName = showName;
              weeklyEpisodes.push(allEpisodes[j]);
            }
          }
            self.displayEpisodes(weeklyEpisodes);
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
          var airdate = new Date(weeklyEpisodes[i].airdate);
          var date = airdate.getDate();
          var month = airdate.getMonth();
          var day = airdate.getDay();
          var fullAirDate = days[day] + ' ' + months[month] + ' ' + date;
          if(value.fullDate == fullAirDate) {
            
            if(typeof self.days[index].thisDaysShows == 'undefined') {
              self.$set(self.days[index], 'thisDaysShows', [])
            }

            var alreadyDisplayed = false;
            if(self.days[index].thisDaysShows) {
              if(self.days[index].thisDaysShows.length == 0) {
                self.days[index].thisDaysShows.push(weeklyEpisodes[i]);
              } else {
                for(var j = 0; j < self.days[index].thisDaysShows.length; j++) {
                  if(weeklyEpisodes[i].showName == self.days[index].thisDaysShows[j].showName) {
                    alreadyDisplayed = true;
                  }
                  if(j == self.days[index].thisDaysShows.length - 1) {
                    if(alreadyDisplayed == false) {
                      //console.log(alreadyDisplayed)
                      self.days[index].thisDaysShows.push(weeklyEpisodes[i]);
                    }
                  }
                }
              }
            }
            var lastAdded = self.days[index].thisDaysShows.length - 1;
            self.getShowTimes(index, weeklyEpisodes[i], lastAdded);
          }
        }
      });
    },
    getShowTimes(index, onShow, onShowIndex) {
      var self = this;
      var airTime = parseInt(onShow.airtime);
      if(airTime > 12) {
        airTime = airTime - 12;
        airTime.toString();
        airTime += 'PM';
      } else {
        airTime.toString();
        airTime += 'AM';
      }
      self.$set(self.days[index].thisDaysShows[onShowIndex], 'airTime', '')
      self.days[index].thisDaysShows[onShowIndex].airTime = airTime;
    },
    viewShow(event) {
      var self = this;
      var elem = event.target;
      var showName = elem.parentElement.previousElementSibling.textContent;
      self.$router.push({
        name: 'show', 
        query: {name: showName}, 
      });
    },
    removeFromFavorites(event) {
      var self = this;
      var elem = event.target;
      var showName = elem.parentElement.previousElementSibling.textContent;
      var database = firebase.database();

      var refFavorites = database.ref('users/' + this.$store.state.userID + "/favorites/");
      
      for(var i = 0; i < this.$store.state.favorites.length; i++) {
        console.log(this.$store.state.userID)
        console.log(this.$store.state.favorites[i].showID)
        if(showName == this.$store.state.favorites[i].name) {
          var dbID = this.$store.state.favorites[i].dbID;
          console.log('found match')
        }
      }
      refFavorites.child(dbID).remove();
    },
    clickedCalendarShow(event) {
      var self = this;
      var showName = event.target.parentElement.children[0].children[0].textContent;
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
  height: 1250px;
  width: 100%;
  color: #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title {
  font-size: 24px;
  margin-top: 55px;
  margin-bottom: 55px;
}

.favoriteContainer {
  display: flex;
  flex-direction: column; 
  align-items: center;
  flex-shrink: 0;
  overflow: auto;
  height: 500px;
}

.favoriteShow {
  display: flex;
  justify-content: space-between;
  width: 300px;
  border: 1px solid #dddddd;
  padding: 5px;
  flex-shrink: 0;
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
  background: rgba(219, 81, 39, 0.8);
}

.calendarContainer {
  height: 400px;
  width: 80%;
  display: flex;
  flex-shrink: 0;
}

.day {
  height: 100%;
  width: 14.3%;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
}

.dayTitle {
  border-bottom: 1px solid #dddddd;
  padding-bottom: 5px;
  padding-top: 5px;
  margin-bottom: 5px;
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
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}

.show:hover {
  opacity: 0.9;
  color: #eb4d25;
}

.showName {
  font-size: 14px;
}

.episodeName {
  font-size: 10px;
}

.clickZone {
  height: 100%;
  width: 100%;
  position: absolute;
}

</style>
