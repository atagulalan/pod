<template>
  <div :class="`outputRoller ${type}`">
    <div class="inFront"></div>
    <div v-for="(box, i) in output" :key="`box${i}`" class="box">
      {{ box }}
    </div>
    <div class="atBack"></div>
  </div>
</template>

<script>
export default {
  props: {
    output: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: 'wooden',
    },
  },
  watch: {
    output(newVal, oldVal) {
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
.outputRoller {
  text-align: right;
  .box {
    width: 50px;
    height: 50px;
    background: black;
    color: white;
    text-align: center;
    line-height: 50px;
    display: inline-block;
  }
}
</style>
