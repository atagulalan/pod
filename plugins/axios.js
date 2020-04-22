export default function (obj) {
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

  obj.$axios.interceptors.response.use(null, (error) => {
    obj.app.store.commit('localStorage/resetUser')
    obj.app.accessiblePluginModal.show('authModal')

    if (error.config && error.response && error.response.status === 401) {
      return waitLogin(200).then(() => {
        error.config.headers.Authorization =
          'Bearer: ' + obj.app.store.state.localStorage.user.bearer
        return obj.$axios.request(error.config)
      })
    }

    return Promise.reject(error)
  })
}
