<template>
  <component :is="componentLoader" id="Shoes" />
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
        import(`~/static/img/character/shoes/${newVal}.svg?inline`)
    },
  },
  mounted() {
    this.componentLoader = () =>
      import(`~/static/img/character/shoes/${this.type}.svg?inline`)
  },
}
</script>
