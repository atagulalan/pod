export const buyItem = async function (itemId) {
  console.log('Buying an Item')
  await this.$axios.$post('/api/store/buy', { itemId }).then((response) => {
    // TODO
    console.log(response)
    if (response.success) {
      return true
    } else {
      return false
    }
  })
}

export const listItems = async function () {
  await this.$axios
    .$get('/api/store/list', {
      headers: {
        Authorization: `Bearer: ${this.$store.state.localStorage.user.bearer}`,
      },
    })
    .then((response) => {
      if (response.success) {
        this.items = response.data.items
      }
    })
    .catch((error) => {
      console.log(error)
      // TODO
    })
}
