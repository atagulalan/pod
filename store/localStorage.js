export const state = () => ({
  user: {
    initialized: false,
    id: {
      name: '',
      email: ''
    },
    anonymous: true
  }
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  resetUser(state) {
    console.log('asddoaksşlfksajdşkajf')
    state.user = {
      initialized: false,
      id: {
        name: '',
        email: ''
      },
      anonymous: true
    }
  }
}
