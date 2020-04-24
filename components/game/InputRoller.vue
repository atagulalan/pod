<template>
  <div :class="`inputRoller ${type}`">
    <div class="inFront"></div>
    <div v-for="(box, i) in input" :key="`box${i}`" class="box">
      {{ box }}
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
  watch: {
    input(newVal, oldVal) {
      // bir item alındı, bantı geri sar ve
      // animasyon ile sağa doğru götür
    },
  },
  methods: {
    getOne(e) {
      console.log('getting one...')
    },
  },
}
</script>

<style lang="scss">
.inputRoller {
  .box {
    width: 50px;
    height: 50px;
    background: black;
    color: white;
    text-align: center;
    line-height: 50px;
    float: right;
  }
}
</style>
