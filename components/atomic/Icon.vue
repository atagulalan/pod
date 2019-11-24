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
      default: ''
    },
    color: {
      type: String,
      default: '#252821'
    },
    size: {
      type: Number,
      default: 10
    }
  }
}
</script>

<style>
.icon {
  display: inline-block;
  vertical-align: middle;
  stroke: black;
}

.icon use {
  stroke: inherit;
}
</style>
