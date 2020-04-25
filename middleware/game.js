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
          chapterId: '2565d31289',
          episodes: [
            {
              id: 256589,
              lowestExec: 14,
              lowestLines: 11,
            },
            {
              id: 21231232,
              lowestExec: 14,
              lowestLines: 11,
            },
          ],
        },
        {
          name: 'Redwood',
          chapterId: '2565d31242',
          color: '#FF3448',
          episodes: [],
        },
        {
          name: 'Monteverde',
          chapterId: '2565d31232',
          color: '#00CDE8',
          episodes: [],
        },
        {
          name: 'Crooked',
          chapterId: '2565d31222',
          color: '#FFCF00',
          episodes: [],
        },
      ],
      user: {
        completedEpisodes: [
          {
            id: 256589,
            exec: 14,
            lines: 15,
          },
          {
            id: 21231232,
            exec: 14,
            lines: 16,
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
