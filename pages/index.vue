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
  },
  watch: {
    '$route.meta'({ showModal }) {
      // eslint-disable-next-line no-console
      console.log('showModal', showModal)
      if (showModal) {
        this.$modal.show('uploadModal')
      } else {
        this.$modal.hide('uploadModal')
      }
      this.showModal = showModal
    }
  },
  methods: {
    vProgress(file, progress, bytesSent) {
      this.progress = [file, progress, bytesSent]
      // eslint-disable-next-line no-console
      console.log(this.progress)
    },
    vComplete(response) {
      this.complete = [response]
      // eslint-disable-next-line no-console
      console.log('@@@ COMPLETED', JSON.parse(response.xhr.response))
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
