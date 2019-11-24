export const state = () => ({
  user: {
    initialized: false,
    id: '',
    anonymous: true
  }
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}
