<template>
  <div class="initContainer">
    <ObjectiveModal />
    <CreditsModal />
    <div class="initWrapper">
      <div class="logo">
        <Logo />
      </div>
      <button
        :style="{ backgroundColor: '#46cb92' }"
        @click="selectSection('forests')"
      >
        Harita
      </button>
      <button
        :style="{ backgroundColor: '#ff3448' }"
        @click="selectSection('store')"
      >
        Dolap
      </button>
      <button
        :style="{ backgroundColor: '#00cde8' }"
        @click="
          () => {
            this.$modal.show('objectiveModal')
          }
        "
      >
        Amacımız
      </button>
      <button
        :style="{ backgroundColor: '#ffcf00' }"
        @click="
          () => {
            this.$modal.show('creditsModal')
          }
        "
      >
        Jenerik
      </button>
      <button
        :style="{ backgroundColor: '#683F28' }"
        @click="selectSection('code')"
      >
        Çıkış
      </button>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/atomic/Logo'
import ObjectiveModal from '~/components/modals/ObjectiveModal'
import CreditsModal from '~/components/modals/CreditsModal'
export default {
  components: {
    Logo,
    ObjectiveModal,
    CreditsModal,
  },
  methods: {
    selectSection(section) {
      this.$router.push(`/${section}`)
    },
  },
}
</script>

<style lang="scss">
.initContainer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .initWrapper {
    width: 40vw;
    height: 60vh;
    margin: auto;
    margin-top: 180px;
    min-width: 400px;
    text-align: center;

    .logo {
      width: 144px;
      height: 200px;
      max-width: 500px;
      margin: auto;
    }

    button {
      border: 0;
      border-radius: 500px;
      cursor: pointer;
      font-size: 20pt;
      font-weight: 600;
      padding: 17pt 32pt;
      width: 90%;
      margin: 0 auto 20px;
      overflow: hidden;
      max-width: 500px;
      text-align: center;
      color: #fff;

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
}
</style>
