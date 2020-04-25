<template>
  <div class="episodeWrapper">Episode SVG will be here. ;) {{ id }}</div>
</template>

<script>
import { getForests } from '~/middleware/game'

export default {
  components: {},
  data() {
    return {
      id: 0,
    }
  },
  mounted() {
    this.id = this.$route.params.id
    getForests.bind(this)()
  },
  methods: {},
}
</script>

<style lang="scss">
.episodeWrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #f7f6f2;
  overflow: auto;
  text-align: center;
}
</style>
