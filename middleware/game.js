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
        return response.data
      }
    })
    .catch(console.log)
  return k
}

export const getForests = async function () {
  /* 
  const response = {
    success: true,
    message: 'Tüm ormanlar listelendi',
    code: 'chapters_listed',
    data: {
      chapters: [
        {
          name: 'Belgrad',
          color: '#46CB92',
          chapterId: 'b',
          episodes: [
            {
              id: '1',
              lowestExec: 14,
              lowestLines: 11,
              mission: 'Görev: Kutu Taşıma',
              info:
                'İçinde robot parçaları olan üç kutu var. Bunları taşımama yardım eder misin?',
            },
            {
              id: '2',
              lowestExec: 14,
              lowestLines: 11,
              mission: 'Görev: Daha Çok Kutu',
              info:
                'Birkaç tane daha kutum var, ancak kaç tane olduğunu hatırlayamadım.',
            },
            {
              id: '3-1',
              lowestExec: 14,
              lowestLines: 11,
              mission: 'Görev: Döndür',
              info:
                'Bize gelen kutular yanlış sıralanmış. Her iki kutunun yerini değiştirmen gerekiyor. Yapabilir misin?',
            },
            {
              id: '3-2',
              lowestExec: 14,
              lowestLines: 11,
            },
            {
              id: '4',
              lowestExec: 14,
              lowestLines: 11,
            },
            {
              id: '5',
              lowestExec: 14,
              lowestLines: 11,
            },
          ],
        },
        {
          name: 'Redwood',
          chapterId: 'r',
          color: '#FF3448',
          episodes: [],
        },
        {
          name: 'Monteverde',
          chapterId: 'm',
          color: '#00CDE8',
          episodes: [],
        },
        {
          name: 'Crooked',
          chapterId: 'c',
          color: '#FFCF00',
          episodes: [],
        },
      ],
      user: {
        completedEpisodes: [
          {
            id: 'b-1',
            exec: 14,
            lines: 11,
          },
        ],
      },
    },
  }
 */

  await this.$axios
    .$get('/api/chapter/list')
    .then((response) => {
      if (response.success) {
        console.log(response)
        this.forests = response.data.chapters
        this.completedEpisodes = response.data.user.completedEpisodes
      }
    })
    .catch((error) => {
      console.log(error)
      // TODO
    })
}
