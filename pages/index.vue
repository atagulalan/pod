<template>
  <div class="container">
    <ResetPassModal />
    <Hero v-if="loaded" />
    <div v-show="!loaded" class="loader">
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
@keyframes fadein {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  80% {
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
  }
}

.blackLoading {
  width: 100vw;
  height: 100vh;
  animation: fadein 5s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
  opacity: 1;
  background: black;
  position: absolute;
  z-index: 9999999;
  left: 0;
  top: 0;
}

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
@keyframes getIn {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-40vh);
  }
}

@keyframes getOut {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100vw - 40vh));
  }
}

@keyframes wait {
  100% {
    transform: translateX(0);
  }
}

.default-leave-active::after,
.layout-leave-active::after,
.default-enter-active::after,
.layout-enter-active::after,
.loadingWrapper {
  content: '';
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 1000;
  pointer-events: none;
}

$loadingColor: rgb(0, 0, 0);

.default-leave-active::after,
.layout-leave-active::after {
  width: calc(100vw + 40vh);
  background: radial-gradient(
      circle at 80vh center,
      $loadingColor 0,
      $loadingColor 80vh,
      transparent 0,
      transparent 100%
    ),
    radial-gradient(
      circle at 160vh center,
      $loadingColor 0,
      $loadingColor 80vh,
      transparent 0,
      transparent 100%
    ),
    radial-gradient(
      circle at 240vh center,
      $loadingColor 0,
      $loadingColor 80vh,
      transparent 0,
      transparent 100%
    ),
    radial-gradient(
      circle at 320vh center,
      $loadingColor 0,
      $loadingColor 80vh,
      transparent 0,
      transparent 100%
    ),
    radial-gradient(
      circle at 400vh center,
      $loadingColor 0,
      $loadingColor 80vh,
      transparent 0,
      transparent 100%
    );
  animation: getIn 0.333s ease-in 0s;
  animation-fill-mode: forwards;
}

.default-enter-active::after,
.layout-enter-active::after,
.loadingWrapper {
  width: calc(100vw + 80vh);
  background: radial-gradient(
    circle at right center,
    transparent 0,
    transparent 80vh,
    $loadingColor 0,
    $loadingColor 100%
  );
}

.loadingWrapper.animate {
  animation: getOut 0.333s ease-out 0s forwards;
}

.default-enter-active::after,
.layout-enter-active::after {
  animation: getOut 0.333s ease-out 0.333s;
  animation-fill-mode: forwards;
}

.default-enter-active,
.layout-enter-active {
  animation: wait 0.333s ease-out 0.333s;
}
.default-leave-active,
.layout-leave-active {
  animation: wait 0.333s ease-in 0s;
}

.default-enter-active,
.layout-enter-active,
.default-leave-active,
.layout-leave-active {
  overflow: hidden !important;
  width: 100vw;
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
