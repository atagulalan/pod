<template>
  <component :is="componentLoader" class="hvr-bob" />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      componentLoader: '',
    }
  },
  watch: {
    type(newVal) {
      this.componentLoader = () =>
        import(`~/static/img/character/eyes/${newVal}.svg?inline`)
    },
  },
  mounted() {
    this.componentLoader = () =>
      import(`~/static/img/character/eyes/${this.type}.svg?inline`)
  },
}
</script>
