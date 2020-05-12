export const authenticated = function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}

export const logout = async function () {
  const logoutResult = await this.$axios.$post('/api/auth/logout')
  console.log(logoutResult)
  if (logoutResult.success) {
    this.$store.commit('localStorage/resetUser')
    this.$router.push('/')
  }
}

export const login = async function (email, pass, callback = () => {}) {
  await this.$axios
    .$post('/api/auth/login', { email, pass })
    .then((response) => {
      if (response.success) {
        this.$store.commit('localStorage/setUser', {
          initialized: true,
          bearer: response.access_token,
          id: {
            username: response.data.username,
            email: response.data.email,
          },
          anonymous: false,
        })
        this.$modal.hide('authModal')
        callback()
      }
    })
    .catch((error) => {
      console.log(error)
      this.loginMailError = ' '
      this.loginPassError = 'E-posta veya şifre uyuşmuyor'
    })
}

export const register = async function (email, pass, name) {
  await this.$axios
    .$post('/api/auth/register', { email, pass, name })
    .then((response) => {
      if (response.success) {
        this.$store.commit('localStorage/setUser', {
          initialized: true,
          id: {
            username: response.data.username,
            email: response.data.email,
            name,
          },
          anonymous: false,
        })
        this.$modal.hide('authModal')
      }
    })
    .catch((error) => {
      console.log(error)
      this.registerMailError = 'Bu e-posta daha önceden kullanılmış'
    })
}

export const forgotPass = async function (email) {
  await this.$axios
    .$post('/api/auth/forgotPass', { email })
    .then((response) => {
      console.log(response)
      if (response.success) {
        this.forgotPassError = ''
        this.forgotPassSent = true
      }
      this.forgotPassLoading = false
    })
    .catch((error) => {
      console.log(error)
      this.forgotPassSent = false
      this.forgotPassError = 'Böyle bir e-posta adresi bulunamadı'
      this.forgotPassLoading = false
    })
}

export const reset = async function (pass) {
  await this.$axios
    .$put('/api/auth/resetpass?resetpassToken=' + this.$route.params.token, {
      pass,
    })
    .then((response) => {
      console.log(response)
      if (response.success) {
        this.resetPassError = ''
        this.resetPassAgainError = ''
        this.resetPassSuccess = true
        setTimeout(
          () => {
            this.$router.push('/login')
          },
          5000,
          this
        )
      }
    })
    .catch((error) => {
      console.log(error)
      this.resetPassError = 'Geçersiz sıfırlama isteği.'
    })
}
