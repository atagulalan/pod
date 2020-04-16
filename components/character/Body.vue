<template>
  <g id="Body" class="hvr-bob">
    <Shorts :type="shorts" />
    <Shirt :type="shirt" />
  </g>
</template>

<script>
import Shirt from '~/components/character/Shirt.vue'
import Shorts from '~/components/character/Shorts.vue'

export default {
  components: {
    Shirt,
    Shorts,
  },
  props: {
    shirt: {
      type: String,
      default: '0',
    },
    shorts: {
      type: String,
      default: '0',
    },
  },
}
</script>

<style lang="scss" scoped>
#Body {
  animation-delay: -1.3s;
}
</style>
