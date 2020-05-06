<template>
  <div class="container">
    <ResetPassModal />
    <Hero v-if="loaded" />
    <div v-else class="loader">
      <Logo class="logo" />
      Yükleniyor
    </div>
  </div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import ResetPassModal from '~/components/modals/ResetPassModal.vue'
import Logo from '~/components/atomic/Logo.vue'

export default {
  components: {
    Hero,
    ResetPassModal,
    Logo,
  },
  data() {
    return {
      progress: [],
      complete: [],
      loaded: false,
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.loaded = true
      if (this.$route.meta.showResetPassModal) {
        this.$modal.show('resetPassModal')
      }
      if (this.$route.meta.showLoginModal) {
        this.$modal.show('authModal')
      }
    })
  },
  head() {
    return {
      title: 'Pod',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Bilgisayarların nasıl bilgiyi saydığını öğrenin, hem de eğlenceli bir şekilde!',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
/*
  ---------------------------------------------
  Default Styles
  ---------------------------------------------
*/

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #fcfcfc;
  overflow: hidden;
}

.noscroll {
  ::-webkit-scrollbar {
    width: 0px !important;
    height: 0px !important;
    background: transparent !important;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: none !important;
    border: none !important;
  }
  ::-webkit-scrollbar-track {
    box-shadow: none !important;
    border: none !important;
  }
}

/*
  ---------------------------------------------
  Global Animations
  ---------------------------------------------
*/

.hvr-bob {
  display: inline-block;
  transform: perspective(1px) translateZ(0);
  animation-name: hvr-bob-float, hvr-bob;
  animation-duration: 0.3s, 1.5s;
  animation-timing-function: ease-out, ease-in-out;
  animation-delay: 0s, 0.3s;
  animation-iteration-count: 1, infinite;
  animation-direction: normal, alternate;
  box-shadow: 0 0 1px transparent;
  animation-fill-mode: forwards;
}

/*
  ---------------------------------------------
  Page Transitions
  ---------------------------------------------
*/

@keyframes getInLeft {
  0% {
    height: auto;
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    height: auto;
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes getOutLeft {
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(50px);
  }
}
@keyframes getInRight {
  0% {
    height: auto;
    opacity: 0;
    transform: translateX(50px);
  }
  100% {
    height: auto;
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes getOutRight {
  0% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(-50px);
  }
}
.default-enter-active,
.layout-enter-active {
  height: 0;
  overflow: hidden;
  animation: getInRight 0.2s ease-out 0.2s;
}
.layout-enter-active {
  animation: getInLeft 0.2s ease-out 0.2s;
}
.default-leave-active {
  animation: getOutRight 0.2s ease-in 0s;
}
.layout-leave-active {
  animation: getOutLeft 0.2s ease-in 0s;
}

/*
  ---------------------------------------------
  Parallax base styles
  ---------------------------------------------
*/

.parallax {
  overflow: hidden overlay !important;
  perspective: 300px;
  background: #c345ff;

  &.debug {
    .group {
      -webkit-transform: translate3d(800px, 0, -800px) rotateY(30deg);
      transform: translate3d(700px, 0, -800px) rotateY(30deg);
    }
    .layer {
      box-shadow: 0 0 0 2px #000;
      opacity: 0.9;
    }
  }

  .group {
    position: relative;
    width: 100%;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    .layer {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform-style: preserve-3d;

      @for $i from 1 through 400 {
        &.m-#{$i} {
          transform: translateZ($i + px) scale(1 - ($i * 0.0033333333333));
          z-index: $i + 4;
        }
      }
      &.m0 {
        transform: translateZ(0) scale(1);
        z-index: 4;
      }
      @for $i from 1 through 600 {
        &.m#{$i} {
          transform: translateZ(($i * -1) + px)
            scale(1 + ($i * 0.0033333333333));
          z-index: 4 - $i;
        }
      }
    }
  }
}

/*
  ---------------------------------------------
  VueBar Scrollbar Styles
  ---------------------------------------------
*/

.vuebar-element {
  height: 100vh;
  width: 100%;
}

.vb {
  &.vb-dragging-phantom {
    .vb-dragger {
      .vb-dragger-styler {
        background-color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  &.vb-dragging {
    .vb-dragger {
      .vb-dragger-styler {
        background-color: rgba(0, 0, 0, 0.4);
        margin: 0 1.5px;
        height: 100%;
      }
    }
  }
  &.vb-scrolling-phantom {
    .vb-dragger {
      .vb-dragger-styler {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
  .vb-dragger {
    z-index: 5;
    width: 12px;
    right: 0;
    .vb-dragger-styler {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      -webkit-transform: rotate3d(0, 0, 0, 0);
      transform: rotate3d(0, 0, 0, 0);
      -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out,
        height 100ms ease-out;
      transition: background-color 100ms ease-out, margin 100ms ease-out,
        height 100ms ease-out;
      background-color: rgba(0, 0, 0, 0.1);
      margin: 2.5px;
      border-radius: 20px;
      height: calc(100% - 5px);
      display: block;
    }
    &:hover {
      .vb-dragger-styler {
        background-color: rgba(0, 0, 0, 0.4);
        margin: 0 1.5px;
        height: 100%;
      }
    }
  }
}

/*
  ---------------------------------------------
  Loader
  ---------------------------------------------
*/
.loader {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  .logo {
    width: 200px;
    height: 200px;
    flex: 1 0 100%;
  }
}
</style>
