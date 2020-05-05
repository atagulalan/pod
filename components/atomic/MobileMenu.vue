<template>
  <div :class="['mobileMenu', sticky ? 'sticky' : '']">
    <div class="backButton" @click="back">
      <Icon :size="44" i="chevron-left" stroke="#fff" stroke-width="2" />
    </div>
    <h1 :style="`color:${color}`">{{ title }}</h1>
    <span class="slot">
      <slot />
    </span>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'

export default {
  components: { Icon },
  props: {
    title: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#000',
    },
    back: {
      type: Function,
      default: () => {
        // this.$router.go(-1)
      },
    },
    sticky: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.mobileMenu {
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  overflow: hidden;
  line-height: 100px;
  display: none;
  padding: 0 40px;

  &.sticky {
    position: fixed;
  }

  .backButton {
    float: left;
    width: 60px;
    height: 60px;
    background: #9ccc66;
    margin: 20px;
    border-radius: 50%;
    line-height: 58px;
    text-align: center;
    cursor: pointer;
    margin-left: 0;
  }
  h1 {
    float: left;
  }
}
</style>
