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

export const getChapters = async function () {
  await this.$axios
    .$get('/api/chapters/list')
    .then((response) => {
      if (response.success) {
        // TODO
      }
    })
    .catch((error) => {
      console.log(error)
      // TODO
    })
}
