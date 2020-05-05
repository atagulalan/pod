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

export const getForests = /* async */ function () {
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

  this.forests = response.data.chapters
  this.completedEpisodes = response.data.user.completedEpisodes
  /*
  await this.$axios
    .$get('/api/chapters/list')
    .then((response) => {
      if (response.success) {
        // TODO
        console.log(response)
      }
    })
    .catch((error) => {
      console.log(error)
      // TODO
    })
  */
}
