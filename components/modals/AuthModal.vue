<template>
  <div class="authModalWrapper">
    <modal
      name="authModal"
      transition="scale"
      class="regModal"
      width="1000"
      height="auto"
      @before-close="beforeClose"
    >
      <LoginModal
        v-if="modalType === 'login'"
        key="login"
        @toggleAuthModal="toggleAuthModal"
      />
      <RegistrationModal
        v-if="modalType === 'register'"
        key="register"
        @toggleAuthModal="toggleAuthModal"
      />
      <ForgotPassModal
        v-if="modalType === 'forgotPass'"
        key="forgotPass"
        @toggleAuthModal="toggleAuthModal"
      />
    </modal>
  </div>
</template>

<script>
import RegistrationModal from '~/components/modals/submodals/RegistrationModal'
import LoginModal from '~/components/modals/submodals/LoginModal'
import ForgotPassModal from '~/components/modals/submodals/ForgotPassModal'

export default {
  components: {
    RegistrationModal,
    LoginModal,
    ForgotPassModal,
  },
  data() {
    return {
      modalType: 'login',
    }
  },
  methods: {
    toggleAuthModal(type) {
      this.modalType = type
    },
    beforeClose() {
      this.modalType = 'login'
    },
  },
}
</script>

<style lang="scss">
.modalInnerWrapper {
  position: relative;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
}

.authModalWrapper {
  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.4s;
  }
  .scale-enter {
    opacity: 0;
    transform: translateY(50px);
  }
  .scale-leave-active {
    opacity: 0;
    transform: translateY(-50px);
  }

  .regModal {
    .v--modal {
      box-shadow: none;
      background-image: url('/img/popup.svg');
      background-size: cover;
      background-color: transparent;
    }
    h1 {
      font-size: 18px;
      padding-top: 70px;
      padding-bottom: 20px;
      color: black;
      font-weight: 500;
      cursor: default;
      text-align: center;
    }
  }

  .checkboxes {
    width: 346px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 15px;
    text-align: center;
  }

  .subText {
    text-align: center;
    font-size: 11pt;
    margin-top: 30px;
    margin-bottom: 50px;
    .link {
      color: #6f9941;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>
