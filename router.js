import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import PodCode from '~/pages/podcode'
import Store from '~/pages/store'

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
          showResetPassModal: false
        }
      },
      {
        name: 'ResetPass',
        path: '/resetPass/:token',
        component: Home,
        meta: {
          showResetPassModal: true
        }
      },
      {
        name: 'PodCode',
        path: '/code',
        component: PodCode
      },
      {
        name: 'Store',
        path: '/store',
        component: Store
      }
    ]
  })

  return router
}
