webpackJsonp([1],{"4G/k":function(t,e){},"4QAK":function(t,e){},"4jgS":function(t,e){},AOQp:function(t,e){},CPfI:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i=s("pFYg"),o=s.n(i),n=s("7t+N"),r=s.n(n),l=s("Sazm"),c=s.n(l),u=s("NYxO"),d={name:"App",data:function(){return{userLoggedIn:!1,userID:null}},created:function(){this.checkLoggedIn()},mounted:function(){window.addEventListener("scroll",this.handleScroll),this.handleScroll()},filters:{},methods:{checkLoggedIn:function(){var t=this;c.a.auth().onAuthStateChanged(function(e){if(e){if(e){t.userID=c.a.auth().currentUser.uid,t.$store.commit("userIsLoggedIn"),c.a.database().ref("users/"+t.userID).on("value",function(e){var s={username:e.val().username,userID:t.userID};t.$store.commit("setUsernameAndID",s),t.getFavorites()})}}else;})},getFavorites:function(){var t=this,e=c.a.database(),s=e.ref("users/"+this.$store.state.userID),a=(e.ref("users/"+this.$store.state.userID+"/favorites"),[]);s.on("child_added",function(e){var s=e.val();"object"==(void 0===s?"undefined":o()(s))&&r.a.each(s,function(t,e){var s={showID:e.showID,name:e.showName,dbID:t};a.push(s)}),t.$store.commit("setFavorites",a)})},handleScroll:function(t){var e=document.querySelector(".topNavWrapper"),s=document.querySelector(".searchInput");window.location.href.includes("show")?window.scrollY>650?(e.style.background="#222222",s.style.background="#dddddd",s.style.color="#222222"):(e.style.background="",s.style.background="",s.style.color=""):window.scrollY>100?(e.style.background="#222222",s.style.background="#dddddd",s.style.color="#222222"):(e.style.background="",s.style.background="",s.style.color="")}}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("topNav"),this._v(" "),e("router-view",{key:this.$route.fullPath}),this._v(" "),e("footerComponent")],1)},staticRenderFns:[]};var v=s("VU/8")(d,h,!1,function(t){s("PFLD")},null,null).exports,m=s("/ocq"),f=s("mtWM"),p=s.n(f),g={name:"home",data:function(){return{popularTV:null,airingToday:null}},created:function(){this.requestPopularTV(),this.requestAiringToday()},methods:{requestPopularTV:function(){var t=this;p()({method:"get",url:"https://api.themoviedb.org/3/discover/tv?api_key=75234636e15f7c2463efbf69fd35b291&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false"}).then(function(e){t.popularTV=e.data.results.slice(0,9)}).catch(function(t){console.log(t)})},requestAiringToday:function(){var t=this;p()({method:"get",url:"https://api.themoviedb.org/3/tv/airing_today?api_key=75234636e15f7c2463efbf69fd35b291"}).then(function(e){t.airingToday=e.data.results.slice(0,9)}).catch(function(t){console.log(t)})},goToShowDetails:function(t,e){this.$router.push({name:"show",query:{name:e.name},params:{id:e.id}})}}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"airingTodayTitle title"},[t._v("Airing Today")]),t._v(" "),t.airingToday?s("div",{staticClass:"airingTodayContainer container"},t._l(t.airingToday,function(e){return s("div",{staticClass:"showContainer",on:{click:function(s){t.goToShowDetails(s,e)}}},[s("img",{staticClass:"tvImg",attrs:{src:"https://image.tmdb.org/t/p/original"+e.backdrop_path}}),t._v(" "),s("div",{staticClass:"showText"},[s("div",{staticClass:"showName"},[t._v(t._s(e.name))])])])})):t._e(),t._v(" "),s("router-link",{staticClass:"moreButton",attrs:{to:{path:"airingToday"}}},[t._v("View More")]),t._v(" "),s("div",{staticClass:"title"},[t._v("Popular")]),t._v(" "),t.popularTV?s("div",{staticClass:"popularContainer container"},t._l(t.popularTV,function(e){return s("div",{staticClass:"showContainer",on:{click:function(s){t.goToShowDetails(s,e)}}},[s("img",{staticClass:"tvImg",attrs:{src:"https://image.tmdb.org/t/p/original"+e.backdrop_path}}),t._v(" "),s("div",{staticClass:"showText"},[s("div",{staticClass:"showName"},[t._v(t._s(e.name))])])])})):t._e(),t._v(" "),s("router-link",{staticClass:"moreButton",attrs:{to:{path:"popular"}}},[t._v("View More")])],1)},staticRenderFns:[]};var w=s("VU/8")(g,_,!1,function(t){s("mzCu")},"data-v-426561e9",null).exports,C={name:"show",data:function(){return{show:null,showID:null,numSeasons:null,seasons:null,loggedIn:!1,userID:"",favorites:[],showIsFavorite:!1,showIsNotFavorite:!1,favoritesPromiseReturned:!1,showPromiseReturned:!1,cast:null}},created:function(){this.checkForShowID(),this.checkLoggedIn()},filters:{checkIfOverTen:function(t){return t<10?t="0"+t:t}},methods:{checkLoggedIn:function(){var t=this;c.a.auth().onAuthStateChanged(function(e){e&&e&&(t.loggedIn=!0,t.userID=c.a.auth().currentUser.uid,t.getFavorites())})},getFavorites:function(){var t=this,e=c.a.database(),s=e.ref("users/"+t.userID);e.ref("users/"+t.userID+"/favorites");t.favorites=[],s.on("child_added",function(e){var s=e.val();"object"==(void 0===s?"undefined":o()(s))&&(r.a.each(s,function(e,s){var a={favID:e,name:s.showName};t.favorites.push(a)}),t.favoritesPromiseReturned=!0,t.checkIfFavorite())})},checkIfFavorite:function(){if(this.showIsNotFavorite=!1,this.showIsFavorite=!1,this.showPromiseReturned&&this.favoritesPromiseReturned)if(this.loggedIn)for(var t=0;t<this.favorites.length;t++)this.show.name==this.favorites[t].name&&(this.showIsFavorite=!0,this.showIsNotFavorite=!1),t==this.favorites.length-1&&0==this.showIsFavorite&&(this.showIsNotFavorite=!0,this.showIsFavorite=!1);else console.log("no show")},checkForShowID:function(){var t=this;if(void 0!==this.$route.params.id)t.showID=this.$route.params.id,this.loadShowData();else{var e=this.$route.query.name;p()({method:"get",url:"https://api.themoviedb.org/3/search/tv?api_key=75234636e15f7c2463efbf69fd35b291&query="+e}).then(function(e){t.showID=e.data.results[0].id,t.loadShowData()}).catch(function(t){console.log(t)})}},loadShowData:function(){var t=this;p()({method:"get",url:"https://api.themoviedb.org/3/tv/"+t.showID+"?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response=credits"}).then(function(e){t.show=e.data,t.showPromiseReturned=!0,t.cast=e.data.credits.cast,t.getFavorites(),t.numSeasons=t.show.seasons.length,t.getSeasonData()}).catch(function(t){console.log(t)})},getSeasonData:function(){for(var t=this,e="",s="",a=0;a<t.numSeasons;a++)a>=20?s+="season/"+a+",":e+="season/"+a+",";p()({method:"get",url:"https://api.themoviedb.org/3/tv/"+t.showID+"?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response="+e}).then(function(e){t.seasons=[];for(var a=0;a<t.numSeasons;a++)void 0!=e.data["season/"+a]&&t.seasons.push(e.data["season/"+a]);t.numSeasons>20&&p()({method:"get",url:"https://api.themoviedb.org/3/tv/"+t.showID+"?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response="+s}).then(function(e){for(var s=0;s<t.numSeasons;s++)void 0!=e.data["season/"+s]&&t.seasons.push(e.data["season/"+s])}).catch(function(t){console.log(t)})}).catch(function(t){console.log(t)})},toggleList:function(t){var e=t.target.classList[0];if("seasonsTitle"==e)var s=r()(".seasonsContainer");else if("seasonImg"==e)s=t.target.nextElementSibling;else if("episode"==e)var a=t.target.children[0];else"overlayBackground"==e&&r()(".eachSeasonsEpisodes").each(function(){r()(this).hasClass("overlay")&&r()(this).removeClass("overlay"),r()(".overlayBackground").hasClass("dim")&&r()(".overlayBackground").removeClass("dim")});void 0!==a?r()(a).toggleClass("hidden"):void 0!==s&&(r()(s).toggleClass("overlay"),r()(".overlayBackground").toggleClass("dim"))},addToFavorites:function(){var t=c.a.database();t.ref("users/"+this.userID),t.ref("users/"+this.userID+"/favorites");if(0==this.favorites.length)t.ref("users/"+this.userID+"/favorites").push({showName:this.show.name,showID:this.showID});else for(var e=!1,s=0;s<this.favorites.length;s++)this.favorites[s]==this.show.name&&(console.log("found a match"),e=!0),s==this.favorites.length-1&&0==e&&(console.log("didnt find a match"),t.ref("users/"+this.userID+"/favorites").push({showName:this.show.name,showID:this.showID}));this.getFavorites()},removeFromFavorites:function(){for(var t=c.a.database().ref("users/"+this.userID+"/favorites/"),e=0;e<this.favorites.length;e++)if(this.show.name==this.favorites[e].name){var s=this.favorites[e].favID;console.log("found match")}t.child(s).remove(),this.getFavorites()},goToSeason:function(t){var e=t.target.nextElementSibling.textContent;e=e.split("Season "),this.$router.push({name:"season",query:{show:this.show.name,season:e[1],id:this.showID}})}}},y={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[t.show?s("img",{staticClass:"showImg",attrs:{src:"https://image.tmdb.org/t/p/original"+t.show.backdrop_path}}):t._e(),t._v(" "),t.show?s("div",{staticClass:"showDetails"},[s("div",{staticClass:"showDetailsTop"}),t._v(" "),s("div",{staticClass:"showInfo"},[s("div",{staticClass:"left_show_info"},[s("div",{staticClass:"left"},[t.show?s("img",{staticClass:"showPosterImg",attrs:{src:"https://image.tmdb.org/t/p/w185"+t.show.poster_path}}):t._e()]),t._v(" "),s("div",{staticClass:"right"},[s("div",{staticClass:"showName"},[t._v(t._s(t.show.name))]),t._v(" "),s("div",{staticClass:"showOverview"},[t._v(t._s(t.show.overview))])])]),t._v(" "),s("div",{staticClass:"right_show_info"},[s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Series Premiere:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.first_air_date))])]),t._v(" "),s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Episode Runtime:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.episode_run_time[0])+"min")])]),t._v(" "),s("div",{staticClass:"seriesDetails multiLine"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Genre:")]),t._v(" "),t._l(t.show.genres,function(e){return s("div",{staticClass:"showDetailsItemRight moveRight"},[t._v("\n                "+t._s(e.name)+" \n              ")])})],2),t._v(" "),s("div",{staticClass:"seriesDetails multiLine"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Created By:")]),t._v(" "),t._l(t.show.created_by,function(e){return s("div",{staticClass:"showDetailsItemRight moveRight"},[s("div",[t._v(t._s(e.name))])])})],2),t._v(" "),s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Most Recent Air Date:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.last_air_date))])]),t._v(" "),s("div",{staticClass:"seriesDetails multiLine"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Network:")]),t._v(" "),t._l(t.show.networks,function(e){return s("div",{staticClass:"showDetailsItemRight moveRight"},[t._v("\n                "+t._s(e.name)+"\n              ")])})],2),t._v(" "),s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Number of Episodes:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.number_of_episodes))])]),t._v(" "),s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Number of Seasons:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.number_of_seasons))])]),t._v(" "),s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Show Status:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.status))])]),t._v(" "),s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Show Type:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.type))])]),t._v(" "),s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Show Score:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.vote_average)+"/10")])]),t._v(" "),s("div",{staticClass:"seriesDetails"},[s("div",{staticClass:"showDetailsItemLeft"},[t._v("Show # Votes:")]),t._v(" "),s("div",{staticClass:"showDetailsItemRight"},[t._v(t._s(t.show.vote_count))])])])]),t._v(" "),t.showIsNotFavorite?s("div",{staticClass:"addToFavoritesButton",on:{click:t.addToFavorites}},[t._v("Add to favorites")]):t._e(),t._v(" "),t.showIsFavorite?s("div",{staticClass:"removeFromFavoritesButton",on:{click:t.removeFromFavorites}},[t._v("Remove from favorites")]):t._e(),t._v(" "),s("div",{staticClass:"seasonsTitle"},[t._v("Seasons")]),t._v(" "),t.numSeasons?s("div",{staticClass:"seasonsContainer",on:{click:function(e){t.toggleList(e)}}},t._l(t.seasons,function(e){return s("div",{staticClass:"season"},[s("div",{staticClass:"clickZone",on:{click:function(e){t.goToSeason(e)}}}),t._v(" "),s("div",{staticClass:"seasonTitle list-item"},[t._v("Season "+t._s(e.season_number))]),t._v(" "),s("img",{staticClass:"seasonImg",attrs:{src:"https://image.tmdb.org/t/p/original"+e.poster_path}})])})):t._e(),t._v(" "),s("div",{staticClass:"castTitle"},[t._v("Cast")]),t._v(" "),s("div",{staticClass:"castContainer"},t._l(t.cast,function(e){return s("div",{staticClass:"castMember"},[s("div",{staticClass:"castText"},[s("div",[t._v(t._s(e.name)+" as")]),t._v(" "),s("div",[t._v(t._s(e.character))])]),t._v(" "),s("img",{staticClass:"castMemberImg",attrs:{src:"https://image.tmdb.org/t/p/w185"+e.profile_path}})])}))]):t._e()])},staticRenderFns:[]};var D=s("VU/8")(C,y,!1,function(t){s("Vdie")},"data-v-22531ce6",null).exports,I={name:"searchResults",data:function(){return{results:null,totalPages:null}},watch:{"$route.params.id":function(t){console.log(t),this.doSearch()}},created:function(){this.doSearch()},filters:{},methods:{doSearch:function(){var t=this;console.log(this.$route.query.query),p()({method:"get",url:"https://api.themoviedb.org/3/search/tv?api_key=75234636e15f7c2463efbf69fd35b291&language=en-US&query="+this.$route.query.query+"&page=1"}).then(function(e){t.results=e.data.results,t.totalPages=e.data.total_pages}).catch(function(t){console.log(t)})},goToShowDetails:function(t){console.log(t.target);for(var e=t.target.previousElementSibling.children[0].innerHTML,s=0;s<this.results.length;s++)if(this.results[s].name==e)var a=this.results[s].id;this.$router.push({name:"show",query:{name:e},params:{id:a}})}}},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"pageTitle"},[t._v("Search Results")]),t._v(" "),t.results?s("div",{staticClass:"searchResultsContainer"},t._l(t.results,function(e){return s("div",{staticClass:"result",on:{click:function(e){t.goToShowDetails(e)}}},[s("img",{staticClass:"showPosterImg",attrs:{src:"https://image.tmdb.org/t/p/w185"+e.poster_path}}),t._v(" "),s("div",{staticClass:"showText"},[s("div",{staticClass:"showName"},[t._v(t._s(e.name))])]),t._v(" "),s("div",{staticClass:"clickZone"})])})):t._e()])},staticRenderFns:[]};var S=s("VU/8")(I,b,!1,function(t){s("CPfI")},"data-v-0c0c52b7",null).exports,k={name:"login",data:function(){return{email:"",password:""}},created:function(){},filters:{},methods:{login:function(){var t=this;c.a.auth().signInWithEmailAndPassword(t.email,t.password).then(function(e){t.$router.push({name:"user"})},function(t){alert("failed to login."+t.message)})}}},T={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"loginWrapper"},[s("div",{staticClass:"loginContainer"},[s("div",{staticClass:"title"},[t._v("Login")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"email",attrs:{type:"text",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"password",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("div",{staticClass:"loginButton",on:{click:t.login}},[t._v("Enter")])])])},staticRenderFns:[]};var $=s("VU/8")(k,T,!1,function(t){s("4G/k")},"data-v-7cd2cd43",null).exports,F={name:"signup",data:function(){return{email:"",password:"",username:"",userID:null}},created:function(){},filters:{},methods:{createAccount:function(){var t=this;c.a.auth().createUserWithEmailAndPassword(t.email,t.password).then(function(e){t.userID=c.a.auth().currentUser.uid;c.a.database();t.username=t.email.substring(0,t.email.indexOf("@")),c.a.database().ref("users/"+t.userID).set({username:t.username,email:t.email})},function(t){alert("Opps."+t.message)})}}},P={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"signUpWrapper"},[s("div",{staticClass:"signUpContainer"},[s("div",{staticClass:"title"},[t._v("Create an account")]),t._v(" "),s("div",{staticClass:"details"},[t._v("Having an account allows you to add shows to your favorites and track them to make sure you never miss an episode!")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"email",attrs:{type:"text",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"password",attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),t._v(" "),s("div",{staticClass:"signUpButton",on:{click:t.createAccount}},[t._v("Create Account")])])])},staticRenderFns:[]};var N=s("VU/8")(F,P,!1,function(t){s("wPFl")},"data-v-436904ab",null).exports,R={name:"user",data:function(){return{days:[]}},created:function(){var t=this;this.getDate(),this.$store.state.favorites.length>0?this.findNextAirDate():this.$store.watch(function(e){return t.$store.state.favorites},function(e,s){t.findNextAirDate()},{deep:!0})},filters:{},computed:{favorites:function(){return this.$store.state.favorites}},methods:{getDate:function(){for(var t=-4;t<3;t++){var e=new Date;e.setDate(e.getDate()+t);var s=e.getDate(),a=e.getMonth(),i={fullDate:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][e.getDay()]+" "+["January","February","March","April","May","June","July","August","September","October","November","December"][a]+" "+s,date:e,airDay:s,dayNum:t};this.days.push(i)}},findNextAirDate:function(){for(var t=this,e=0;e<this.$store.state.favorites.length;e++)p()({method:"get",url:"https://api.tvmaze.com/singlesearch/shows?q="+this.$store.state.favorites[e].name+"&embed=episodes"}).then(function(e){for(var s=e.data._embedded.episodes,a=e.data.name,i=new Date,o=[],n=0;n<s.length;n++){var r=new Date(s[n].airdate);Math.round(Math.abs((i.getTime()-r.getTime())/864e5))<=10&&(s[n].showName=a,o.push(s[n]))}t.displayEpisodes(o)}).catch(function(t){console.log(t)})},displayEpisodes:function(t){var e=this;r.a.each(e.days,function(s,a){for(var i=0;i<t.length;i++){var o=new Date(t[i].airdate),n=o.getDate();o.getMonth(),o.getDay();if("The Americans"===t[i].showName)t[i].airdate;if(a.airDay-1==n){void 0===e.days[s].thisDaysShows&&e.$set(e.days[s],"thisDaysShows",[]);var r=!1;if(e.days[s].thisDaysShows)if(0==e.days[s].thisDaysShows.length)e.days[s].thisDaysShows.push(t[i]);else for(var l=0;l<e.days[s].thisDaysShows.length;l++)t[i].showName==e.days[s].thisDaysShows[l].showName&&(r=!0),l==e.days[s].thisDaysShows.length-1&&0==r&&e.days[s].thisDaysShows.push(t[i]);var c=e.days[s].thisDaysShows.length-1;e.getShowTimes(s,t[i],c)}}})},getShowTimes:function(t,e,s){var a=parseInt(e.airtime);a>12?((a-=12).toString(),a+="PM"):(a.toString(),a+="AM"),this.$set(this.days[t].thisDaysShows[s],"airTime",""),this.days[t].thisDaysShows[s].airTime=a},viewShow:function(t){var e=t.target.parentElement.previousElementSibling.textContent;this.$router.push({name:"show",query:{name:e}})},removeFromFavorites:function(t){for(var e=t.target.parentElement.previousElementSibling.textContent,s=c.a.database().ref("users/"+this.$store.state.userID+"/favorites/"),a=0;a<this.$store.state.favorites.length;a++)if(console.log(this.$store.state.userID),console.log(this.$store.state.favorites[a].showID),e==this.$store.state.favorites[a].name){var i=this.$store.state.favorites[a].dbID;console.log("found match")}s.child(i).remove()},clickedCalendarShow:function(t){var e=t.target.parentElement.children[0].children[0].textContent;this.$router.push({name:"show",query:{name:e}})}}},E={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"title"},[t._v("Weekly Shows")]),t._v(" "),s("div",{staticClass:"calendarContainer"},t._l(t.days,function(e){return s("div",{staticClass:"day"},[s("div",{staticClass:"dayTitle"},[t._v(t._s(e.fullDate))]),t._v(" "),e.thisDaysShows?s("div",{staticClass:"dayShows"},t._l(e.thisDaysShows,function(e){return s("div",{staticClass:"show"},[s("div",{staticClass:"left"},[s("div",{staticClass:"showName"},[t._v(t._s(e.showName))]),t._v(" "),s("div",{staticClass:"episodeName"},[t._v(t._s(e.name))])]),t._v(" "),s("div",{staticClass:"right"},[s("div",[t._v(t._s(e.airTime))])]),t._v(" "),s("div",{staticClass:"clickZone",on:{click:function(e){t.clickedCalendarShow(e)}}})])})):t._e()])})),t._v(" "),s("div",{staticClass:"title"},[t._v("Favorite Shows")]),t._v(" "),this.$store.state.favorites?s("div",{staticClass:"favoriteContainer"},t._l(t.favorites,function(e){return s("div",{staticClass:"favoriteShow"},[s("div",{staticClass:"favoriteShowName"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"favoriteShowRight"},[s("div",{staticClass:"viewBtn btn",on:{click:function(e){t.viewShow(e)}}},[t._v("View")]),t._v(" "),s("div",{staticClass:"removeBtn btn",on:{click:function(e){t.removeFromFavorites(e)}}},[t._v("Remove")])])])})):t._e()])},staticRenderFns:[]};var A=s("VU/8")(R,E,!1,function(t){s("4QAK")},"data-v-01f9e50b",null).exports,L={name:"season",data:function(){return{showID:null,season:null,onSeason:null,show:null}},created:function(){this.setInitialData(),this.checkForShowID()},filters:{checkIfOverTen:function(t){return t<10?t="0"+t:t}},methods:{setInitialData:function(){this.onSeason=this.$route.query.season,this.show=this.$route.query.show,this.showID=this.$route.query.id},checkForShowID:function(){var t=this;if(void 0!==this.$route.params.id)t.showID=this.$route.params.id,this.loadSeasonData();else{var e=this.$route.query.show;p()({method:"get",url:"https://api.themoviedb.org/3/search/tv?api_key=75234636e15f7c2463efbf69fd35b291&query="+e}).then(function(e){t.showID=e.data.results[0].id,t.loadSeasonData()}).catch(function(t){console.log(t)})}},loadSeasonData:function(){var t=this;p()({method:"get",url:"https://api.themoviedb.org/3/tv/"+t.showID+"?api_key=75234636e15f7c2463efbf69fd35b291&append_to_response=season/"+t.onSeason}).then(function(e){t.season=e.data["season/"+t.onSeason]}).catch(function(t){console.log(t)})},clickedEpisode:function(t){var e=t.target.parentElement.children[2].children[0].textContent;e=e.split("Episode "),this.$router.push({name:"episode",query:{show:this.show,season:this.onSeason,episode:e[1],id:this.showID}})}}},x={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[t.season?s("div",{staticClass:"seasonContainer"},[s("div",{staticClass:"seasonDetails"},[s("div",{staticClass:"seasonImg"},[s("img",{staticClass:"episodeImg",attrs:{src:"https://image.tmdb.org/t/p/w185"+t.season.poster_path}})]),t._v(" "),s("div",{staticClass:"seasonText"},[s("div",{staticClass:"seasonTitle"},[t._v("Season "+t._s(t.season.season_number))]),t._v(" "),s("div",{staticClass:"seasonOverview"},[t._v(t._s(t.season.overview))])])]),t._v(" "),s("div",{staticClass:"episodeContainer"},t._l(t.season.episodes,function(e){return s("div",{staticClass:"episode"},[s("div",{staticClass:"clickZone",on:{click:function(e){t.clickedEpisode(e)}}}),t._v(" "),s("div",{staticClass:"episodeImg"},[s("img",{attrs:{src:"https://image.tmdb.org/t/p/w185"+e.still_path}})]),t._v(" "),s("div",{staticClass:"episodeText"},[s("div",{staticClass:"episodeNumber"},[t._v("Episode "+t._s(e.episode_number))]),t._v(" "),s("div",[t._v("\n            "+t._s(e.name)+" ("+t._s(e.season_number)+"x"+t._s(t._f("checkIfOverTen")(e.episode_number))+")\n          ")]),t._v(" "),s("div",{staticClass:"episodeOverview"},[t._v("\n            "+t._s(e.overview)+"\n          ")])])])}))]):t._e()])},staticRenderFns:[]};var M=s("VU/8")(L,x,!1,function(t){s("t9Ai")},"data-v-479833c4",null).exports,q={name:"episode",data:function(){return{onEpisode:null,show:null,showID:null,onSeason:null,episode:null}},created:function(){this.setOnEpisodeAndShow(),this.loadEpisodeData()},filters:{checkIfOverTen:function(t){return t<10?t="0"+t:t}},methods:{setOnEpisodeAndShow:function(){this.onEpisode=this.$route.query.episode,this.show=this.$route.query.show,this.showID=this.$route.query.id,this.onSeason=this.$route.query.season},loadEpisodeData:function(){var t=this;p()({method:"get",url:"https://api.themoviedb.org/3/tv/"+t.showID+"/season/"+t.onSeason+"/episode/"+t.onEpisode+"?api_key=75234636e15f7c2463efbf69fd35b291"}).then(function(e){t.episode=e.data}).catch(function(t){console.log(t)})}}},V={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[t.episode?s("div",{staticClass:"episodeContainer"},[s("div",{staticClass:"top"},[s("div",{staticClass:"episodeImg item"},[s("img",{attrs:{src:"https://image.tmdb.org/t/p/w500"+t.episode.still_path}})]),t._v(" "),s("div",{staticClass:"episodeText item"},[s("div",{staticClass:"episodeName"},[t._v(t._s(t.episode.name)+" ("+t._s(t.episode.season_number)+"x"+t._s(t._f("checkIfOverTen")(t.episode.episode_number))+")")]),t._v(" "),s("div",{staticClass:"episodeOverview"},[t._v(t._s(t.episode.overview))])])]),t._v(" "),s("div",{staticClass:"bottom"},[s("div",{staticClass:"item"},[s("div",[t._v("Original Air Date")]),t._v(" "),s("div",[t._v(t._s(t.episode.air_date))])])])]):t._e()])},staticRenderFns:[]};var O=s("VU/8")(q,V,!1,function(t){s("rHVs")},"data-v-1b17fb57",null).exports,U={name:"airingToday",data:function(){return{airingTodayShows:null,totalPages:null,onPage:1}},created:function(){this.getAiringToday()},filters:{},methods:{getAiringToday:function(){var t=this;p()({method:"get",url:"https://api.themoviedb.org/3/tv/airing_today?api_key=75234636e15f7c2463efbf69fd35b291&page="+t.onPage}).then(function(e){var s=e.data;if(t.totalPages=s.total_pages,t.onPage=s.page,t.airingTodayShows){var a=t.airingTodayShows;s.results.forEach(function(t){a.push(t)}),t.airingTodayShows=a}else t.airingTodayShows=s.results;t.onPage<t.totalPages?(t.onPage=t.onPage+1,t.getAiringToday()):(t.onPage,t.totalPages)}).catch(function(t){console.log(t)})},goToShowDetails:function(t,e){this.$router.push({name:"show",query:{name:e.name},params:{id:e.id}})}}},B={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"airingTodayContainer"},[s("div",{staticClass:"pageTitle"},[t._v("Airing Today")]),t._v(" "),s("div",{staticClass:"airingTodayShows"},t._l(t.airingTodayShows,function(e){return s("div",{staticClass:"showContainer",on:{click:function(s){t.goToShowDetails(s,e)}}},[s("img",{staticClass:"tvImg",attrs:{src:"https://image.tmdb.org/t/p/original"+e.backdrop_path}}),t._v(" "),s("div",{staticClass:"showText"},[s("div",{staticClass:"showName"},[t._v(t._s(e.name))])]),t._v(" "),s("div",{staticClass:"clickZone"})])}))])},staticRenderFns:[]};var z=s("VU/8")(U,B,!1,function(t){s("yH8z")},"data-v-3791c79b",null).exports,H={name:"popular",data:function(){return{popularShows:null,totalPages:null,onPage:1}},created:function(){this.getPopular()},filters:{},methods:{getPopular:function(){var t=this;p()({method:"get",url:"https://api.themoviedb.org/3/discover/tv?api_key=75234636e15f7c2463efbf69fd35b291&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&page="+t.onPage}).then(function(e){var s=e.data;if(t.totalPages=s.total_pages,t.onPage=s.page,t.popularShows){var a=t.popularShows;s.results.forEach(function(t){a.push(t)}),t.popularShows=a}else t.popularShows=s.results;t.onPage<t.totalPages&&t.onPage<10?(t.onPage=t.onPage+1,t.getPopular()):(t.onPage,t.totalPages)}).catch(function(t){console.log(t)})},goToShowDetails:function(t,e){this.$router.push({name:"show",query:{name:e.name},params:{id:e.id}})}}},W={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"popularContainer"},[s("div",{staticClass:"pageTitle"},[t._v("Airing Today")]),t._v(" "),s("div",{staticClass:"airingTodayShows"},t._l(t.popularShows,function(e){return s("div",{staticClass:"showContainer",on:{click:function(s){t.goToShowDetails(s,e)}}},[s("img",{staticClass:"tvImg",attrs:{src:"https://image.tmdb.org/t/p/original"+e.backdrop_path}}),t._v(" "),s("div",{staticClass:"showText"},[s("div",{staticClass:"showName"},[t._v(t._s(e.name))])]),t._v(" "),s("div",{staticClass:"clickZone"})])}))])},staticRenderFns:[]};var Y=s("VU/8")(H,W,!1,function(t){s("AOQp")},"data-v-29036c6c",null).exports;a.a.use(m.a);var j=new m.a({routes:[{path:"/",name:"home",component:w},{path:"/show",name:"show",component:D},{path:"/searchResults",name:"searchResults",component:S},{path:"/login",name:"login",component:$},{path:"/signup",name:"signup",component:N},{path:"/tracking",name:"trackingView",component:A,meta:{requiresAuth:!0}},{path:"/season",name:"season",component:M},{path:"/episode",name:"episode",component:O},{path:"/airingToday",name:"airingToday",component:z},{path:"/popular",name:"popular",component:Y}]});j.beforeEach(function(t,e,s){window.scrollTo(0,0);var a=c.a.auth().currentUser;t.matched.some(function(t){return t.meta.requiresAuth})&&!a?s("login"):s()});var K=j;a.a.use(u.a);var Z=new u.a.Store({state:{selectedShowID:null,userLoggedIn:!1,username:null,userID:null,favorites:[]},actions:{},mutations:{userIsLoggedIn:function(t){t.userLoggedIn=!0},setUsernameAndID:function(t,e){t.username=e.username,t.userID=e.userID},setFavorites:function(t,e){t.favorites=e},logOut:function(t){t.userLoggedIn=!1,t.username=null,t.userID=null,t.favorites=[]}},getters:{}}),G={name:"search",data:function(){return{searchInputValue:null}},created:function(){},filters:{},methods:{clickedSearch:function(){var t=r()(".searchInput")[0].textContent;""!=t&&(this.searchInputValue=t,this.$router.push({name:"searchResults",query:{query:this.searchInputValue},params:{id:""}}))},checkKey:function(t){if(13==t.keyCode)return t.preventDefault(),console.log("clicked enter"),!1}}};r()(document).on("keypress",".searchInput",function(t){return 13==t.which&&r()(".searchSubmitButton").trigger("click"),13!=t.which});var Q={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"searchWrapper"},[s("div",{staticClass:"searchBarContainer"},[s("div",{staticClass:"searchInput",attrs:{contenteditable:"true",spellcheck:"false",placeholder:"search..."},on:{keyup:t.checkKey}}),t._v(" "),s("div",{staticClass:"searchSubmitButton",on:{click:function(e){t.clickedSearch()}}},[t._v("Search")])])])},staticRenderFns:[]};var J=s("VU/8")(G,Q,!1,function(t){s("n2+6")},"data-v-1a3b1c34",null).exports,X={name:"topNav",data:function(){return{}},created:function(){},mounted:function(){},filters:{},methods:{logOut:function(){var t=this,e=this;c.a.auth().signOut().then(function(){t.$router.push("login"),e.$store.commit("logOut")}),this.hideMobileMenu()},showMobileMenu:function(){document.querySelector(".mobileMenu").classList.add("mobileMenuShow")},hideMobileMenu:function(){console.log("hiding"),document.querySelector(".mobileMenu").classList.remove("mobileMenuShow")}}},tt={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"topNavWrapper"},[s("div",{staticClass:"left"},[s("router-link",{staticClass:"homeBtn button",attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),s("div",{staticClass:"center"},[s("search"),t._v(" "),s("div",{staticClass:"hamburgerButton",on:{click:t.showMobileMenu}},[s("i",{staticClass:"fas fa-bars"})])],1),t._v(" "),s("div",{staticClass:"right"},[this.$store.state.userLoggedIn?t._e():s("router-link",{staticClass:"loginBtn button",attrs:{to:"/login"}},[t._v("Login")]),t._v(" "),this.$store.state.userLoggedIn?t._e():s("router-link",{staticClass:"registerBtn button",attrs:{to:"/signUp"}},[t._v("Register")]),t._v(" "),this.$store.state.username?s("router-link",{staticClass:"userAccountBtn button",attrs:{to:"/tracking"}},[t._v("Tracker")]):t._e(),t._v(" "),this.$store.state.userLoggedIn?s("div",{staticClass:"logoutBtn button",on:{click:t.logOut}},[t._v("Log Out")]):t._e()],1),t._v(" "),s("div",{staticClass:"mobileMenu"},[s("div",{staticClass:"mobileMenuTop"},[s("i",{staticClass:"fas fa-times closeButton",on:{click:t.hideMobileMenu}})]),t._v(" "),s("router-link",{staticClass:"mobileButton",attrs:{to:"/"},nativeOn:{click:function(e){return t.hideMobileMenu(e)}}},[t._v("Home")]),t._v(" "),this.$store.state.userLoggedIn?t._e():s("router-link",{staticClass:"mobileButton",attrs:{to:"/login"},nativeOn:{click:function(e){return t.hideMobileMenu(e)}}},[t._v("Login")]),t._v(" "),this.$store.state.userLoggedIn?t._e():s("router-link",{staticClass:"mobileButton",attrs:{to:"/signUp"},nativeOn:{click:function(e){return t.hideMobileMenu(e)}}},[t._v("Register")]),t._v(" "),this.$store.state.username?s("router-link",{staticClass:"mobileButton",attrs:{to:"/user"},nativeOn:{click:function(e){return t.hideMobileMenu(e)}}},[t._v(t._s(this.$store.state.username))]):t._e(),t._v(" "),this.$store.state.userLoggedIn?s("div",{staticClass:"logoutBtn mobileButton",on:{click:t.logOut}},[t._v("Log Out")]):t._e()],1)])},staticRenderFns:[]};var et=s("VU/8")(X,tt,!1,function(t){s("4jgS")},"data-v-6189896e",null).exports,st={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"footerContainer"},[this._v("\n  FOOTER CONTAINER\n")])},staticRenderFns:[]};var at=s("VU/8")({name:"footerComponent",data:function(){return{}},created:function(){},filters:{},methods:{}},st,!1,function(t){s("TNdV")},"data-v-0126e282",null).exports;a.a.config.productionTip=!1;c.a.initializeApp({apiKey:"AIzaSyA-rrCEAY3uzNqiRVqpQ8nyrK_NUGwkHG0",authDomain:"vue-tv-app.firebaseapp.com",databaseURL:"https://vue-tv-app.firebaseio.com",projectId:"vue-tv-app",storageBucket:"",messagingSenderId:"292005833741"}),c.a.auth().onAuthStateChanged(function(t){new a.a({el:"#app",router:K,store:Z,components:{App:v},template:"<App/>"})}),a.a.component("search",J),a.a.component("topNav",et),a.a.component("footerComponent",at)},PFLD:function(t,e){},TNdV:function(t,e){},Vdie:function(t,e){},mzCu:function(t,e){},"n2+6":function(t,e){},rHVs:function(t,e){},t9Ai:function(t,e){},wPFl:function(t,e){},yH8z:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.ae827e2491018f83949b.js.map