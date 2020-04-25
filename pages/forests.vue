<template>
  <div class="forestsWrapper">
    <Globe :forests="forests" />

    <ForestSelector
      v-for="(forest, i) in forests"
      :key="`forest-${i}`"
      :percentage="percentages[forest.name]"
      :background="forest.color"
      @click="selectForest(forest.chapterId)"
    >
      {{ forest.name }}
    </ForestSelector>
  </div>
</template>

<script>
import Globe from '~/components/forests/Globe.vue'
import ForestSelector from '~/components/atomic/ForestSelector.vue'
import { getForests } from '~/middleware/game'

export default {
  components: {
    Globe,
    ForestSelector,
  },
  data() {
    return {
      forests: [],
      completedEpisodes: [],
      percentages: {},
    }
  },
  watch: {
    completedEpisodes(ceps) {
      this.forests.forEach((forest) => {
        if (!forest.episodes.length) {
          this.percentages[forest.name] = 0
        } else {
          let y = 0
          ceps.forEach((cep) => {
            const ep = forest.episodes.find((ep) => ep.id === cep.id)
            if (ep) {
              y++
              if (ep.lowestExec === cep.exec) y++
              if (ep.lowestLines === cep.lines) y++
            }
          })

          this.percentages[forest.name] = Math.ceil(
            (y * 100) / (forest.episodes.length * 3)
          )
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
  background: #f7f6f2;
  overflow: auto;
  text-align: center;
}
</style>
