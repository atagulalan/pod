<template>
  <g class="hvr-bob">
    <g id="Head">
      <path
        class="foreskin"
        d="M245,126.5h-9.2c-59.7,0-108.1,48.4-108.1,108.1v0c0,59.7,48.4,108.1,108.1,108.1h9.2
		c59.7,0,108.1-48.4,108.1-108.1v0C353.1,174.9,304.7,126.5,245,126.5z"
      />
      <path
        class="ear"
        d="M183.6,254.5l-2.1-7.2c-2.4-8.2-10.9-12.9-19.1-10.5c-8.2,2.4-12.9,10.9-10.5,19.1l2.1,7.2
		c2.4,8.2,10.9,12.9,19.1,10.5C181.2,271.2,186,262.7,183.6,254.5z"
      />
    </g>
    <EyeBrows type="0" />
    <Hair />
    <Glasses type="0" />
  </g>
</template>

<script>
import Hair from '~/components/character/Hair.vue'
import EyeBrows from '~/components/character/EyeBrows.vue'
import Glasses from '~/components/character/Glasses.vue'
export default {
  components: {
    Hair,
    EyeBrows,
    Glasses
  },
  props: {}
}
</script>

<style lang="scss" scoped>
.foreskin {
  fill: #fce6de;
}
.ear {
  fill: #efd6ce;
}
</style>
