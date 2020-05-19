import Vue from 'vue'
import Router from 'vue-router'

import Home from '~/pages/index'
import PodCode from '~/pages/podcode'
import Store from '~/pages/store'
import Forests from '~/pages/forests'
import Episodes from '~/pages/episode'
import Init from '~/pages/init'
import Scoreboard from '~/pages/scoreboard'

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
        name: 'Episodes',
        path: '/forests/:id',
        component: Episodes,
      },
      {
        name: 'PodCode',
        path: '/code/:id',
        component: PodCode,
      },
      {
        name: 'PodCodeNoID',
        path: '/code',
        component: PodCode,
      },
      {
        name: 'Store',
        path: '/store',
        component: Store,
      },
      {
        name: 'Init',
        path: '/init',
        component: Init,
      },
      {
        name: 'Scoreboard',
        path: '/scoreboard',
        component: Scoreboard,
      },
    ],
  })

  return router
}
