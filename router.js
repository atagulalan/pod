import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'

Vue.use(Router)

export function createRouter() {
  const router = new Router({
    mode: 'history',
    routes: [
      {
        name: 'Home',
        path: '/',
        component: Home,
        meta: {
          showModal: false
        }
      }
    ]
  })

  return router
}
