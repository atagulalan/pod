<template>
  <div class="noscroll">
    <div id="episodeWrapper" class="episodeWrapper">
      <EpisodeModal
        :stars="stars"
        :info="info"
        :mission="mission"
        :active-episode="activeEpisode"
      />
      <MobileMenu
        :title="forest.name"
        :back="
          () => {
            this.$router.push('/forests')
          }
        "
        :sticky="true"
      ></MobileMenu>
      <div class="ghostHeight" :style="`height: ${forestHeight}px`"></div>
      <div id="episodeInner">
        <component
          :is="componentLoader"
          id="forest"
          :class="`forest f-${id}`"
          @click="forestClickHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MobileMenu from '~/components/atomic/MobileMenu.vue'
import EpisodeModal from '~/components/modals/EpisodeModal.vue'
import { getForests } from '~/middleware/game'

export default {
  components: {
    MobileMenu,
    EpisodeModal,
  },
  props: {
    type: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      forest: {},
      forests: [],
      completedEpisodes: [],
      id: 0,
      componentLoader: '',
      scrollBehaviour: 'desktop',
      forestHeight: 10000,
      stars: [0, 0, 0],
      info: '',
      mission: '',
      activeEpisode: '',
    }
  },
  watch: {
    completedEpisodes(ceps) {
      this.forest = this.forests.find((forest) => {
        return forest.chapterId === this.id.split('-')[0]
      })
    },
  },
  mounted() {
    this.componentLoader = () =>
      import(`~/static/img/forests/${this.$route.params.id}.svg?inline`)
    this.id = this.$route.params.id
    getForests
      .bind(this)()
      .then((data) => {
        console.log(data)
        this.forests = data.chapters
        this.completedEpisodes = data.user.completedEpisodes
      })

    /* SCROLLING START */
    const episodeWrapper = document.getElementById('episodeWrapper')
    const episodeInner = document.getElementById('episodeInner')

    episodeWrapper.ontouchstart = function () {
      if (this.scrollBehaviour === 'desktop') {
        episodeWrapper.scrollTo(0, this.forestHeight)
        episodeInner.style.top = '0px'
      }
      this.scrollBehaviour = 'mobile'
    }.bind(this)

    episodeWrapper.onmousewheel = function () {
      if (this.scrollBehaviour === 'mobile') {
        episodeWrapper.scrollTo(0, 0)
        episodeInner.style.top = 'initial'
      }
      this.scrollBehaviour = 'desktop'
    }.bind(this)

    episodeWrapper.onscroll = function (e) {
      if (this.scrollBehaviour === 'desktop') {
        if (
          episodeWrapper.scrollTop >
          this.forestHeight - episodeWrapper.clientHeight
        ) {
          episodeWrapper.scrollTo(
            0,
            this.forestHeight - episodeWrapper.clientHeight
          )
        }
        this.forestHeight = episodeInner.clientHeight
        episodeInner.style.transform =
          'translate3d(0,' + episodeWrapper.scrollTop * 2 + 'px, 0)'
      } else {
        this.forestHeight = episodeInner.clientHeight
        episodeInner.style.transform = 'translate3d(0, 0px, 0)'
      }
    }.bind(this)

    /* SCROLLING END */
  },
  methods: {
    forestClickHandler(e) {
      const id = e.srcElement.parentElement.id
      console.log(id)
      if (id.startsWith('OPEN-')) {
        const episodeId = id.substring(5)
        const episode = this.forest.episodes.find(
          (el) => el.episodeId === episodeId
        )
        if (episode) {
          const userStats = this.completedEpisodes.find((el) => {
            return el.episodeId === this.forest.chapterId + '-' + episodeId
          })
          console.log('OPENING EPISODE', episodeId)
          console.log('USER STATS: ', userStats)
          console.log('EPISODE: ', episode)

          // User already played this episode
          if (userStats) {
            this.stars = [
              true,
              episode.scores.min.lines >= userStats.lines,
              episode.scores.min.exec >= userStats.exec,
            ]
            console.log('STARS: ', this.stars)
          } else {
            this.stars = [0, 0, 0]
          }

          this.info = episode.info
          this.mission = episode.mission
          this.activeEpisode = this.forest.chapterId + '-' + episodeId

          // TODO change modal
          this.$modal.show('episodeModal')
        }
      }
    },
  },
}
</script>

<style lang="scss">
.episodeWrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #f7f6f2;
  overflow: auto;
  text-align: center;
  overflow-x: hidden;
  .mobileMenu {
    display: block;
  }

  #episodeInner {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .forest {
    width: 500vw;
    max-width: 4000px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: -5px;
    min-width: 100vw;
    g[id^='OPEN-'] {
      cursor: pointer;
    }
  }
}
</style>
