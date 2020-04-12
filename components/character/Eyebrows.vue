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
  computed: {
    componentLoader() {
      return () =>
        import(`~/static/img/character/eyebrows/${this.type}.svg?inline`)
    },
  },
}
</script>
