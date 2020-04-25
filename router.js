import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import PodCode from '~/pages/podcode'
import Store from '~/pages/store'
import Forests from '~/pages/forests'

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
          showResetPassModal: false,
          showLoginModal: false,
        },
      },
      {
        name: 'Login',
        path: '/login',
        component: Home,
        meta: {
          showLoginModal: true,
        },
      },
      {
        name: 'ResetPass',
        path: '/resetPass/:token',
        component: Home,
        meta: {
          showResetPassModal: true,
        },
      },
      {
        name: 'Forests',
        path: '/forests',
        component: Forests,
      },
      {
        name: 'PodCode',
        path: '/code',
        component: PodCode,
      },
      {
        name: 'Store',
        path: '/store',
        component: Store,
      },
    ],
  })

  return router
}
