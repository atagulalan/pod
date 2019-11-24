<template>
  <div class="container">
    <RegistrationModal />
    <Hero :v-progress="vProgress" :v-complete="vComplete" />
  </div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import RegistrationModal from '~/components/modals/RegistrationModal.vue'

export default {
  head() {
    return {
      title: 'Pod',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Buraya açıklama girilecek'
        }
      ]
    }
  },
  components: {
    Hero,
    RegistrationModal
  },
  data() {
    return {
      progress: [],
      complete: [],
      showModal: this.$route.meta.showModal
    }
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #fcfcfc;
}
</style>
