<template>
  <component :is="componentLoader" />
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
        import(`~/static/img/character/hair/${newVal}.svg?inline`)
    },
  },
  mounted() {
    this.componentLoader = () =>
      import(`~/static/img/character/hair/${this.type}.svg?inline`)
  },
}
</script>
