import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import PodCode from '~/pages/podcode'

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
      },
      {
        name: 'PodCode',
        path: '/code',
        component: PodCode,
        meta: {
          showModal: false
        }
      }
    ]
  })

  return router
}
