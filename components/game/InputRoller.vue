<template>
  <div :class="`inputRoller ${type} ${animateBoxes ? 'animateBoxes' : ''}`">
    <div class="inFront"></div>
    <div class="boxWrapper">
      <div v-for="(box, i) in input" :key="`box${i}`" class="box">
        {{ box }}
      </div>
    </div>
    <div class="atBack"></div>
  </div>
</template>

<script>
export default {
  props: {
    input: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'wooden',
    },
  },
  data() {
    return {
      animateBoxes: false,
      memory: [],
    }
  },
  watch: {
    input: {
      // This will let Vue know to look inside the array
      deep: true,
      handler(newVal) {
        // bir item alındı, bantı geri sar ve
        // animasyon ile sağa doğru götür
        if (newVal.length < this.memory.length) {
          this.animateBoxes = true
          setTimeout(() => {
            this.animateBoxes = false
          }, 1000)
        }

        this.memory = [...newVal]
      },
    },
  },
}
</script>

<style lang="scss">
.inputRoller {
  width: 685px;
  height: 161px;
  background: url('/img/game/rollers/default/normal.svg');
  position: relative;
  overflow: hidden;

  @keyframes getBox {
    0% {
      transform: translateX(-140px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  &.animateBoxes {
    .boxWrapper {
      animation: getBox 1s forwards;
    }
  }

  .inFront {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    background: url('/img/game/rollers/default/inFront.svg');
  }
  .atBack {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    background: url('/img/game/rollers/default/inFront.svg');
  }
  .boxWrapper {
    width: 10000px;
    right: 0;
    top: 21px;
    height: 44px;
    position: absolute;
    padding: 2px 20px 2px 0;
    .box {
      margin: 0 0 0 100px;
    }
  }
}
</style>
