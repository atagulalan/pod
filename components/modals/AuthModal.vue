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
      <div class="mobileModalExitButton" @click="$modal.hide('authModal')">
        <Icon :size="36" i="close" stroke="#f00" />
      </div>
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
import Icon from '~/components/atomic/Icon.vue'

export default {
  components: {
    RegistrationModal,
    LoginModal,
    ForgotPassModal,
    Icon,
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

.mobileModalExitButton {
  display: none;
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

.authModalWrapper,
.resetPassModalWrapper {
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
      transform: translate(-50%, -50%);
      top: 50vh !important;
      left: 50vw !important;
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
    max-width: 346px;
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
@media only screen and (max-width: 767px) {
  .authModalWrapper .authModal .v--modal {
    width: 100% !important;
    height: 100vh !important;
    left: 0 !important;
    top: 0 !important;
    transform: translate(0, 0);
    background: white;
  }
  .authModalWrapper .authModal h1 {
    padding-top: 0;
  }
  .modalInnerWrapper {
    transform: scale(1) translate(-50%, -50%);
    top: 50% !important;
    left: 50% !important;
    position: relative;
    transform-origin: center;
    padding: 0 10px;
  }
  .spacer {
    display: none;
  }
  .mobileModalExitButton {
    width: 50px;
    height: 50px;
    background-color: #ffb4ae;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    line-height: 46px;
    text-align: center;
    display: block;
  }
  .authModalWrapper .subText {
    font-size: 12pt;
  }
}
</style>
