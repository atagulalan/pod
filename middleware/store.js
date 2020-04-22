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
      if (response.success) {
        listItems.bind(this)()
        return true
      } else {
        return false
      }
    })
    .catch((error) => {
      console.log(error)
      this.wearingLoading = 3
      setTimeout(
        () => {
          this.wearingLoading = 0
        },
        15000,
        this
      )
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
        this.items = response.data.items || {}
        this.owned = response.data.user.items || {}
        this.worn = response.data.user.worn || {}
        this.money = response.data.user.money || 0
        this.hair =
          response.data.user.worn.find((el) => el.type === 'hair')?.key ||
          this.hair
        this.eyes =
          response.data.user.worn.find((el) => el.type === 'eyes')?.key ||
          this.eyes
        this.shirt =
          response.data.user.worn.find((el) => el.type === 'shirt')?.key ||
          this.shirt
        this.shorts =
          response.data.user.worn.find((el) => el.type === 'shorts')?.key ||
          this.shorts
        this.shoes =
          response.data.user.worn.find((el) => el.type === 'shoes')?.key ||
          this.shoes
        this.skinColor =
          response.data.user.worn.find((el) => el.type === 'skin')?.key ||
          this.skinColor
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
    })
}
