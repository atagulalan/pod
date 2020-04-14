<template>
  <div class="authModalWrapper">
    <modal
      name="authModal"
      transition="scale"
      class="authModal"
      width="1000"
      height="auto"
      @before-close="beforeClose"
    >
      <div
        class="spacer"
        :style="`height:${
          modalType === 'login'
            ? 730
            : modalType === 'register'
            ? 830
            : modalType === 'forgotPass'
            ? 600
            : 0
        }px`"
      ></div>
      <transition name="slide-fade">
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
      </transition>
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
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s;
}

.slide-fade-enter-to {
  transition-delay: 0.3s;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.spacer {
  width: 1px;
  display: block;
  transition: 0.3s all;
}

.modalInnerWrapper {
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  transform: scale(1.5);
  transform-origin: top;
  position: absolute;
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

  .authModal {
    .v--modal {
      box-shadow: none;
      background-image: url('/img/popup.svg');
      background-size: cover;
      background-color: transparent;
      top: 50vh !important;
      transform: translateY(-50%);
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
