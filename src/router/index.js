import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import show from '@/components/show'
import searchResults from '@/components/searchResults'
import login from '@/components/login'
import signup from '@/components/signup'
import user from '@/components/user'
import season from '@/components/season'
import episode from '@/components/episode'

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
      path: '/user',
      name: 'user',
      component: user,
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
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(requiresAuth && !currentUser) next ('login')
  //else if(!requiresAuth && currentUser) next ('user')
  else next()
})

export default router;
