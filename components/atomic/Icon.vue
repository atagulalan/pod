<template>
  <svg-icon
    :name="i"
    :width="size"
    :height="size"
    :stroke="color"
    class="icon"
  />
</template>

<script>
export default {
  props: {
    i: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#252821',
    },
    size: {
      type: Number,
      default: 10,
    },
  },
}
</script>

<style>
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.rotate {
  animation: rotation 2s infinite linear;
}

.icon {
  display: inline-block;
  vertical-align: middle;
}

.icon use {
  stroke: inherit;
}
</style>
