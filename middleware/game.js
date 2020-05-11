export const getCode = async function (id) {
  const k = await this.$axios
    .$get(`/api/chapter/code/${id}`)
    .then((response) => {
      if (response.success) {
        return response.data
      }
    })
    .catch(console.log)
  return k
}

export const sendCode = async function (id, code) {
  const k = await this.$axios
    .$post(`/api/chapter/code/${id}`, { code })
    .then((response) => {
      if (response.success) {
        return response
      }
    })
    .catch(console.log)
  return k
}

export const getForests = async function () {
  await this.$axios
    .$get('/api/chapter/list')
    .then((response) => {
      if (response.success) {
        console.log(response)
        this.forests = response.data.chapters
        this.completedEpisodes = response.data.user.completedEpisodes
      }
    })
    .catch(console.log)
}
