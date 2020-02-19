<template>
  <div class="container">
    <RegistrationModal />
    <Hero />
  </div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import RegistrationModal from '~/components/modals/RegistrationModal.vue'

export default {
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
  },
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
