<template>
  <div
    :style="`width:${width};` + (center ? 'text-align:center;' : '')"
    class="buttonWrapper"
  >
    <button @click="click">
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    center: {
      type: Boolean,
      default: false
    },
    click: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
.buttonWrapper {
  button {
    color: #fff;
    font-weight: 500;
    border: 0;
    border-radius: 500px;
    padding: 8pt 40pt;
    font-size: 14pt;
    cursor: pointer;
    transition: 0.3s filter;
    background: rgba(111, 153, 65, 1);
    background: linear-gradient(
      135deg,
      rgba(111, 153, 65, 1) 0%,
      rgba(111, 153, 65, 1) 100%
    );

    svg {
      stroke: #fff;
    }
  }
}
</style>
