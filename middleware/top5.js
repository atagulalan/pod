export const top5 = async function (id) {
  const k = await this.$axios
    .$get(`/api/chapter/scoreboard/${id}`)
    .then((response) => {
      if (response.success) {
        return response
      }
    })
    .catch(console.log)
  return k
}
