<template>
  <div class="starsContainer">
    <Star :color="starCount >= 1 ? `#ffc107` : `#eaeaea`"></Star>
    <Star :color="starCount >= 2 ? `#ffc107` : `#eaeaea`"></Star>
    <Star :color="starCount >= 3 ? `#ffc107` : `#eaeaea`"></Star>
  </div>
</template>

<script>
import Star from '~/components/atomic/Star.vue'

export default {
  components: {
    Star,
  },
  props: {
    starCount: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style lang="scss">
.starsContainer {
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .starContainer {
    width: 30px;
  }
}
</style>
