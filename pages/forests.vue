<template>
  <div class="noscroll">
    <div class="forestsWrapper">
      <div class="center">
        <MobileMenu
          title="Harita"
          :back="
            () => {
              this.$router.go(-1)
            }
          "
        >
        </MobileMenu>
        <Globe :forests="forests" />
        <div class="forestButtonsWrapper">
          <ForestSelector
            v-for="(forest, i) in forests"
            :key="`forest-${i}`"
            :percentage="percentages[forest.name]"
            :background="forest.color"
            :locked="locked[forest.name]"
            @click="
              selectForest(forest.chapterId + '-' + lastBranch[forest.name])
            "
          >
            {{ forest.name }}
          </ForestSelector>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Globe from '~/components/forests/Globe.vue'
import ForestSelector from '~/components/atomic/ForestSelector.vue'
import MobileMenu from '~/components/atomic/MobileMenu.vue'
import { getForests } from '~/middleware/game'

export default {
  components: {
    Globe,
    ForestSelector,
    MobileMenu,
  },
  data() {
    return {
      forests: [],
      completedEpisodes: [],
      percentages: {},
      locked: {},
      lastBranch: {},
    }
  },
  watch: {
    completedEpisodes(ceps) {
      this.forests.forEach((forest) => {
        let link = []

        if (!forest.episodes.length) {
          this.percentages[forest.name] = 0
          this.locked[forest.name] = true
        } else {
          // latest preq rearrange
          link = forest.episodes.concat().sort((a, b) => {
            return a.id.replace('-', '.') - b.id.replace('-', '.')
          })

          let latest = -1

          if (ceps.length === 0) {
            this.lastBranch[forest.name] = '0'
          } else {
            // find latest branch of the tree
            ceps.forEach((cep) => {
              const newLatest = link.findIndex((l) => {
                return l.id === cep.id.split('-').slice(1).join('-')
              })
              latest = newLatest > latest ? newLatest : latest
            })

            this.lastBranch[forest.name] = link[latest].id.split('-')[0]
          }

          // console.log(link, ceps, link[latest])

          // calculate percentage
          let y = 0
          ceps.forEach((cep) => {
            const ep = forest.episodes.find(
              (ep) => ep.id === cep.id.split('-').slice(1).join('-')
            )
            if (ep) {
              y++
              if (ep.lowestExec >= cep.exec) y++
              if (ep.lowestLines >= cep.lines) y++
            }
          })

          this.percentages[forest.name] = Math.ceil(
            (y * 100) / (forest.episodes.length * 3)
          )
          this.locked[forest.name] = false
        }
      })
    },
  },
  mounted() {
    getForests.bind(this)()
  },
  methods: {
    selectForest(id) {
      this.$router.push(`/forests/${id}`)
    },
  },
}
</script>

<style lang="scss">
.forestsWrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url(/img/memphis-colorful.png);
  overflow: auto;
  text-align: center;
  &:before {
    content: '';
    background: white;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      white 75%,
      white 100%
    );
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }
}

@media only screen and (max-width: 1279px) {
  .forestsWrapper {
    padding-top: 100px;
    .mobileMenu {
      display: block;
    }
  }
}

@media only screen and (min-width: 1280px) {
  .forestsWrapper {
    .center {
      margin: 0 auto;
      width: calc(680px + 600px);
      height: 100vh;
    }
    .forestButtonsWrapper {
      width: 50vw;
      max-width: 600px;
      float: left;
      top: 50%;
      position: relative;
      transform: translateY(-50%);
    }
  }
}
</style>
