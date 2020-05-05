<template>
  <div class="noscroll">
    <div id="episodeWrapper" class="episodeWrapper">
      <MobileMenu
        title="Belgrad"
        :back="
          () => {
            this.$router.go(-1)
          }
        "
        :sticky="true"
      >
      </MobileMenu>
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
import { getForests } from '~/middleware/game'

export default {
  components: {
    MobileMenu,
  },
  props: {
    type: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      id: 0,
      componentLoader: '',
      scrollBehaviour: 'desktop',
      forestHeight: 10000,
    }
  },
  mounted() {
    this.componentLoader = () =>
      import(`~/static/img/forests/${this.$route.params.id}.svg?inline`)
    this.id = this.$route.params.id
    getForests.bind(this)()

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
      if (id.startsWith('OPEN-')) {
        const episodeId = id.substring(5)
        console.log('OPENING EPISODE', episodeId)
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
