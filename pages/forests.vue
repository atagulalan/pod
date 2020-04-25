<template>
  <div class="forestsWrapper">
    <Globe />
    <ForestSelector :percentage="100" background="#46CB92">
      Belgrad
    </ForestSelector>
    <ForestSelector :percentage="20" background="#FF3448">
      Redwood
    </ForestSelector>
    <ForestSelector :percentage="55" background="#00CDE8">
      Monteverde
    </ForestSelector>
    <ForestSelector :percentage="80" background="#FFCF00">
      Crooked
    </ForestSelector>
  </div>
</template>

<script>
import Globe from '~/components/forests/Globe.vue'
import ForestSelector from '~/components/atomic/ForestSelector.vue'

export default {
  components: {
    Globe,
    ForestSelector,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
.forestsWrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: #f7f6f2;
  overflow: auto;
  text-align: center;
}
</style>
