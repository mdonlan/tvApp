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
      for(var i = -4; i < 3; i++) {
        var tempDate = new Date();
        tempDate.setDate(tempDate.getDate() + i);
        var date = tempDate.getDate();
        var month = tempDate.getMonth();
        var day = tempDate.getDay();
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        var fullDate = days[day] + ' ' + months[month] + ' ' + date;
        var thisDay = {
          fullDate: fullDate,
          date: tempDate,
          airDay: date,
          dayNum: i,
        }
        self.days.push(thisDay);
      }
    },
    findNextAirDate() {
      var self = this;
      for(var i = 0; i < this.$store.state.favorites.length; i++) {
        axios({
        method:'get',
        //url: 'https://api.tvmaze.com/singlesearch/shows?q=' + this.$store.state.favorites[i].name + '&embed=episodes'
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
          //var airdate = new Date(weeklyEpisodes[i].airdate);
          var airdate = new Date(weeklyEpisodes[i].airdate);
          var date = airdate.getDate();
          var month = airdate.getMonth();
          var day = airdate.getDay();
          var fullAirDate = (days[day]) + ' ' + months[month] + ' ' + date;

          if(weeklyEpisodes[i].showName === 'The Americans') {
            var testDate = weeklyEpisodes[i].airdate;
            //console.log(date)
            //console.log(value.airDay)
          }

          if(value.airDay - 1 == date) {
            
            
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
  height: auto;
  flex-shrink: 0;
  background: rgba(0,0,0,0.75);
}

.title {
  font-size: 24px;
  margin-top: 55px;
  margin-bottom: 55px;
}

.favoriteContainer {
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
  width: 500px;
}

.favoriteShow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  box-shadow: 0 1px 0 0 #dddddd; /* Border bottom */
}

.favoriteShow:hover {
  box-shadow: 0 2px 0 0 #dddddd; /* Border bottom */
}

.favoriteShowRight {
  display: flex;
}

.btn {
  padding-top: 3px;
  padding-bottom: 3px;
  width: 75px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 10px 8px -8px black;
}

.btn:hover {
  box-shadow: 0 14px 8px -8px black;
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

.removeBtn:hover {
  background: rgba(219, 81, 39, 1);
}

.calendarContainer {
  display: flex;
  flex-shrink: 0;
  width: 90%;
  height: 400px;
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
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
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

@media screen and (max-width: 1000px) {

  .calendarContainer {
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: auto;
  }

  .day {
    width: 100%;
    margin-bottom: 10px;
    min-height: 100px;
  }

}

@media screen and (max-width: 480px) {
  .wrapper {
    justify-content: flex-start;
  }

  .title {
    margin-top: 25px;
    margin-bottom: 25px;
  }

  .calendarContainer {
    flex-direction: column;
    align-items: center;
    width: 90%;
  }

  .day {
    width: 100%;
    margin-bottom: 10px;
    min-height: 100px;
  }
}

</style>
