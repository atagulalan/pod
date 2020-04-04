<template>
  <div class="registrationModalWrapper">
    <modal
      name="registrationModal"
      transition="scale"
      class="regModal"
      width="680"
      height="auto"
    >
      <span v-if="modalType === 'login'" key="login" class="modalInnerWrapper">
        <h1 class="active">Hesabına giriş yap</h1>
        <Input
          v-model="loginMail"
          leading="envelope"
          name="email"
          placeholder="E-Posta"
          type="email"
          :error="loginMailError"
          :helper="loginMailError ? 'E-Posta adresiniz hatalı' : ''"
          center
          :submit="sendLoginRequest"
        />
        <Input
          v-model="loginPass"
          leading="lock"
          name="pass"
          placeholder="Şifre"
          type="password"
          :submit="sendLoginRequest"
          :error="loginPassError"
          :helper="loginPassError ? 'Şifreniz 6 karakterden az olamaz' : ''"
          center
        />
        <div class="checkboxes">
          <Checkbox v-model="loginRemember" name="remember" :default="true"
            >Beni hatırla</Checkbox
          >
        </div>
        <Button center style="margin-top:10px" :click="sendLoginRequest">
          <Icon :size="24" i="entrance" stroke="#fff" stroke-width="1.5" />Giriş
          Yap
        </Button>
        <div class="subText">
          Hesabın yok mu?
          <span class="link" @click="toggleRegister('register')">Kayıt Ol</span>
        </div>
      </span>

      <span
        v-if="modalType === 'register'"
        key="register"
        class="modalInnerWrapper"
      >
        <h1 class="active">Bir hesap oluştur</h1>
        <Input
          v-model="registerMail"
          leading="envelope"
          name="email"
          placeholder="E-Posta"
          type="email"
          center
        />
        <Input
          v-model="registerPass"
          leading="lock"
          name="pass"
          placeholder="Şifre"
          type="password"
          center
        />
        <Input
          v-model="registerPassAgain"
          leading="lock"
          name="passAgain"
          placeholder="Şifre (Tekrar)"
          type="password"
          center
        />
        <div class="checkboxes">
          <Checkbox v-model="registerRemember" name="remember"
            >Kullanım koşullarını kabul ediyorum</Checkbox
          >
        </div>
        <Button center style="margin-top:10px" @click="sendRegisterRequest()">
          <Icon :size="24" i="entrance" stroke="#fff" stroke-width="1.5" />Kayıt
          Ol
        </Button>
        <div class="subText">
          Hesabın var mı?
          <span class="link" @click="toggleRegister('login')">Giriş Yap</span>
        </div>
      </span>
    </modal>
  </div>
</template>

<script>
import { checkMail } from '~/middleware/helpers'
import Icon from '~/components/atomic/Icon.vue'
import Input from '~/components/atomic/Input.vue'
import Button from '~/components/atomic/Button.vue'
import Checkbox from '~/components/atomic/Checkbox.vue'

export default {
  components: {
    Input,
    Button,
    Checkbox,
    Icon
  },
  data() {
    return {
      modalType: 'login',
      loginMail: '',
      loginPass: '',
      loginRemember: false,
      registerMail: '',
      registerPass: '',
      registerPassAgain: '',
      registerRemember: false,
      loginMailError: false,
      loginPassError: false,
      info: ''
    }
  },
  computed: {
    loaded() {
      return this.$store.state.localStorage && this.$store.state.sessionStorage
    }
  },
  methods: {
    async fetchSomething(email, pass) {
      const loginResult = await this.$axios.$post(
        'http://localhost:5000/api/auth/login',
        { email, pass }
      )

      if (loginResult.success) {
        this.$store.commit('localStorage/setUser', {
          initialized: true,
          id: {
            username: loginResult.data.username,
            email: loginResult.data.email
          },
          anonymous: false
        })
        this.$modal.hide('registrationModal')
      }
    },
    sendLoginRequest() {
      this.loginMailError = !checkMail(this.loginMail)
      this.loginPassError = this.loginPass.length < 6

      if (!this.loginMailError && this.loginPass.length >= 6) {
        this.fetchSomething(this.loginMail, this.loginPass)
      }
    },
    toggleRegister(type) {
      this.modalType = type
    }
  }
}
</script>

<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0s ease;
}
.slide-fade-leave-active {
  transition: all 0s;
}

.slide-fade-enter-to {
  transition-delay: 0s;
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

.modalInnerWrapper {
  position: relative;
  display: block;
  left: 0;
  top: 0;
  width: 100%;
}

.registrationModalWrapper {
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
