import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import show from '@/components/show'
import searchResults from '@/components/searchResults'
import login from '@/components/login'
import signup from '@/components/signup'
import trackingView from '@/components/trackingView'
import season from '@/components/season'
import episode from '@/components/episode'
import airingToday from '@/components/airingToday'
import popular from '@/components/popular'

import firebase from 'firebase';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/show',
      name: 'show',
      component: show
    },
    {
      path: '/searchResults',
      name: 'searchResults',
      component: searchResults
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/tracking',
      name: 'trackingView',
      component: trackingView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/season',
      name: 'season',
      component: season
    },
    {
      path: '/episode',
      name: 'episode',
      component: episode
    },
    {
      path: '/airingToday',
      name: 'airingToday',
      component: airingToday
    },
    {
      path: '/popular',
      name: 'popular',
      component: popular
    },
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth && !currentUser) next ('login')
  //else if(!requiresAuth && currentUser) next ('user')
  else next()
})

export default router;
