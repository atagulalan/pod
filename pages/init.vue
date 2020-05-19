<template>
  <div class="initContainer">
    <ObjectiveModal />
    <CreditsModal />
    <div class="initWrapper">
      <div class="initInner">
        <div class="logo">
          <Logo />
        </div>
        <MenuButton background="#46cb92" @click="selectSection('forests')">
          Harita
        </MenuButton>
        <MenuButton background="#ff3448" @click="selectSection('store')">
          Dolap
        </MenuButton>
        <MenuButton background="#00cde8" @click="showModal('objectiveModal')">
          Amacımız
        </MenuButton>
        <MenuButton background="#ffcf00" @click="showModal('creditsModal')">
          Jenerik
        </MenuButton>
        <MenuButton background="#683F28" @click="logout()">
          Çıkış
        </MenuButton>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/atomic/Logo'
import MenuButton from '~/components/atomic/MenuButton'
import ObjectiveModal from '~/components/modals/ObjectiveModal'
import CreditsModal from '~/components/modals/CreditsModal'
import { logout } from '~/middleware/auth-service'

export default {
  components: {
    Logo,
    MenuButton,
    ObjectiveModal,
    CreditsModal,
  },
  methods: {
    showModal(modalName) {
      this.$modal.show(modalName)
    },
    selectSection(section) {
      this.$router.push(`/${section}`)
    },
    logout,
  },
}
</script>

<style lang="scss">
.initContainer {
  width: 100vw;
  height: 100vh;
  background: url(/img/memphis-colorful.png);
  overflow: auto;

  .initWrapper {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    .initInner {
      margin: auto;
      text-align: center;
      padding: 50px 0;
      width: 100%;
      .logo {
        width: 144px;
        height: 200px;
        max-width: 500px;
        margin: auto;
      }
    }
  }
}
</style>
