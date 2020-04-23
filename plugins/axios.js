export default function (obj, inject) {
  function waitLogin(ms) {
    return new Promise((resolve) => {
      const waitForInitialize = setInterval(() => {
        if (obj.app.store.state.localStorage.user.initialized) {
          clearInterval(waitForInitialize)
          resolve()
        }
      }, ms)
    })
  }

  // Create a custom axios instance
  const axios = obj.$axios.create({
    headers: {
      common: {
        Authorization:
          'Bearer: ' + obj.app.store.state.localStorage.user.bearer,
      },
    },
  })

  axios.interceptors.response.use(
    (response) => {
      // Update bearer if changed
      if (response.data.access_token) {
        axios.defaults.headers.common.Authorization =
          'Bearer: ' + response.data.access_token
      }
      return response
    },
    (error) => {
      if (error.config && error.response && error.response.status === 401) {
        obj.app.store.commit('localStorage/resetUser')
        obj.app.accessiblePluginModal.show('authModal')
        return waitLogin(200).then(() => {
          error.config.headers.Authorization =
            'Bearer: ' + obj.app.store.state.localStorage.user.bearer
          return axios.request(error.config)
        })
      } else if (
        error.config &&
        error.response &&
        error.response.status === 504
      ) {
        obj.app.accessiblePluginModal.show('errorModal')
      }

      return Promise.reject(error)
    }
  )

  // Inject to context as $api
  inject('axios', axios)
}
