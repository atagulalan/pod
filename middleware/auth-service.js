export const authenticated = function({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}

export const logout = async function() {
  console.log('aloo')
  const logoutResult = await this.$axios.$post(
    'http://localhost:5000/api/auth/logout'
  )
  console.log(logoutResult)
  if (logoutResult.success) {
    this.$store.commit('localStorage/resetUser')
  }
}

export const login = async function(email, pass) {
  await this.$axios
    .$post('http://localhost:5000/api/auth/login', { email, pass })
    .then((response) => {
      if (response.success) {
        this.$store.commit('localStorage/setUser', {
          initialized: true,
          id: {
            username: response.data.username,
            email: response.data.email
          },
          anonymous: false
        })
        this.$modal.hide('authModal')
      }
    })
    .catch((error) => {
      console.log(error)
      this.loginMailError = ' '
      this.loginPassError = 'E-posta veya şifre uyuşmuyor'
    })
}

export const register = async function(email, pass) {
  await this.$axios
    .$post('http://localhost:5000/api/auth/register', { email, pass })
    .then((response) => {
      if (response.success) {
        this.$store.commit('localStorage/setUser', {
          initialized: true,
          id: {
            username: response.data.username,
            email: response.data.email
          },
          anonymous: false
        })
        this.$modal.hide('authModal')
      }
    })
    .catch((error) => {
      console.log(error)
      this.registerMailError = 'Bu e-posta daha önceden kullanılmış'
    })
}

export const forgotPass = async function(email) {
  await this.$axios
    .$post('http://localhost:5000/api/auth/forgotPass', { email })
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
