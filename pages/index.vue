<template>
  <div class="container">
    <ResetPassModal />
    <Hero />
  </div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import ResetPassModal from '~/components/modals/ResetPassModal.vue'

export default {
  components: {
    Hero,
    ResetPassModal,
  },
  data() {
    return {
      progress: [],
      complete: [],
    }
  },
  mounted() {
    this.$nextTick(function () {
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #fcfcfc;
  overflow: hidden;
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
</style>
