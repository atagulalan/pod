<template>
  <div class="container">
    <AuthModal />
    <ResetPassModal />
    <Hero />
  </div>
</template>

<script>
import Hero from '~/components/Hero.vue'
import AuthModal from '~/components/modals/AuthModal.vue'
import ResetPassModal from '~/components/modals/ResetPassModal.vue'

export default {
  components: {
    Hero,
    AuthModal,
    ResetPassModal
  },
  data() {
    return {
      progress: [],
      complete: []
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (this.$route.meta.showResetPassModal) {
        this.$modal.show('resetPassModal')
      }
    })
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
