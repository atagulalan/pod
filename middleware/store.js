export const wearItems = async function (willWear) {
  console.log('Buying an Item')
  this.wearingLoading = 1
  await this.$axios
    .$post(
      '/api/store/wear',
      { willWear },
      {
        headers: {
          Authorization: `Bearer: ${this.$store.state.localStorage.user.bearer}`,
        },
      }
    )
    .then((response) => {
      // TODO
      console.log(response)
      if (response.success) {
        listItems.bind(this)()
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
        this.owned = response.data.user.items
        this.worn = response.data.user.worn
        this.money = response.data.user.money
        this.hair = response.data.user.worn.find((el) => el.type === 'hair').key
        this.eyes = response.data.user.worn.find((el) => el.type === 'eyes').key
        this.shirt = response.data.user.worn.find(
          (el) => el.type === 'shirt'
        ).key
        this.shorts = response.data.user.worn.find(
          (el) => el.type === 'shorts'
        ).key
        this.shoes = response.data.user.worn.find(
          (el) => el.type === 'shoes'
        ).key
        this.skinColor = response.data.user.worn.find(
          (el) => el.type === 'skin'
        ).key
        this.loaded = true
        this.wearingLoading = 2
        setTimeout(
          () => {
            this.wearingLoading = 0
          },
          2000,
          this
        )
      }
    })
    .catch((error) => {
      console.log(error)
      // TODO
    })
}