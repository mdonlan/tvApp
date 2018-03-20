import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import show from '@/components/show'

Vue.use(Router)

export default new Router({
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
  ]
})
