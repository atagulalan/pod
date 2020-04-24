<template>
  <div :class="`middleSection`" :style="`min-Width:${80 * n}px`">
    <button v-for="(e, i) in 6" :key="'button' + i" @click="setValue(i)">
      <div v-if="items[i]" class="box">{{ items[i] }}</div>
      <span v-else>{{ e }}</span>
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
  },
}
</script>

<style lang="scss">
.middleSection {
  width: 0px;
  height: 80px;
  background: gray;
  overflow: hidden;
  button {
    background: darkgray;
    width: 80px;
    height: 80px;
    border: none;
    line-height: 80px;
    text-align: center;
    float: left;
    .box {
      width: 80px;
      height: 80px;
      background: black;
      color: white;
      text-align: center;
      line-height: 80px;
    }
  }
}
</style>
