<template>
  <div
    :class="[`middleSection`, focus ? 'focus' : '']"
    :style="`min-Width:${80 * widthLimit}px;height: ${
      n !== 0 ? 80 * Math.ceil(n / widthLimit) : 160
    }px;`"
  >
    <button v-for="(e, i) in 6" :key="'button' + i" @click="setValue(i)">
      <div v-if="items[i]" class="box">{{ items[i] }}</div>
      <span>{{ e }}</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    n: {
      type: Number,
      default: () => 0,
    },
    setValue: {
      type: Function,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
    focus: {
      type: Boolean,
      default: false,
    },
    widthLimit: {
      type: [Number, String],
      default: 6,
    },
  },
}
</script>

<style lang="scss">
@keyframes breathing {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}

.middleSection {
  width: 0px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  margin: 80px auto 40px;
  &.focus {
    z-index: 9999;
    button span {
      background: rgba(255, 255, 255, 0.5);
      border: 2px dashed #4caf50;
      line-height: 66px;
      animation: breathing 3s ease-in-out infinite normal;
    }
  }
  button {
    background: rgba(0, 0, 0, 0.1);
    width: 80px;
    height: 80px;
    border: none;
    line-height: 80px;
    text-align: center;
    float: left;
    span {
      width: 70px;
      height: 70px;
      display: inline-block;
      margin: 5px;
      line-height: 70px;
      border-radius: 10px;
      font-size: 24px;
    }
    .box {
      position: absolute;
      margin: 6px 20px 20px 24px;
      transform: rotateZ(-2deg);
    }
  }
}
</style>
