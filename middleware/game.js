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
  const k = await this.$axios
    .$get('/api/chapter/list')
    .then((response) => {
      if (response.success) {
        return response.data
      }
    })
    .catch(console.log)
  return k
}

export const getLastBranch = function (ceps, forest) {
  let lastBranch = 0
  let link = []

  if (forest.episodes.length) {
    link = forest.episodes.concat().sort((a, b) => {
      return a.episodeId.replace('-', '.') - b.episodeId.replace('-', '.')
    })

    let latest = -1

    if (ceps.length !== 0) {
      // find latest branch of the tree
      ceps.forEach((cep) => {
        const newLatest = link.findIndex((l) => {
          return l.episodeId === cep.episodeId.split('-').slice(1).join('-')
        })
        latest = newLatest > latest ? newLatest : latest
      })

      lastBranch = link[latest].episodeId.split('-')[0]
    }
  }
  return lastBranch
}
