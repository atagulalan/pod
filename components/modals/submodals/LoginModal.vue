<template>
  <span class="modalInnerWrapper">
    <h1 class="active">Hesabına giriş yap</h1>
    <Input
      v-model="loginMail"
      leading="envelope"
      name="email"
      placeholder="E-Posta"
      type="email"
      :error="!!loginMailError"
      error-handler="loginMailError"
      :helper="loginMailError"
      center
      :submit="sendLoginRequest"
      @resolveError="resolveError"
    />
    <Input
      v-model="loginPass"
      leading="lock"
      name="pass"
      placeholder="Şifre"
      type="password"
      :submit="sendLoginRequest"
      :error="!!loginPassError"
      error-handler="loginPassError"
      :helper="loginPassError"
      center
      @resolveError="resolveError"
    />
    <div class="checkboxes">
      <Checkbox v-model="loginRemember" name="remember" :default="true"
        >Beni hatırla</Checkbox
      >
    </div>
    <Button center style="margin-top: 10px;" @click="sendLoginRequest">
      <Icon :size="24" i="entrance" stroke="#fff" stroke-width="1.5" />Giriş Yap
    </Button>
    <div class="subText">
      Hesabın yok mu?
      <span class="link" @click="toggleAuthModal('register')">Kayıt Ol</span>
      <div>
        <span class="link" @click="toggleAuthModal('forgotPass')"
          >Şifremi Unuttum</span
        >
      </div>
    </div>
  </span>
</template>

<script>
import { checkMail } from '~/middleware/helpers'
import Icon from '~/components/atomic/Icon'
import Input from '~/components/atomic/Input'
import Button from '~/components/atomic/Button'
import Checkbox from '~/components/atomic/Checkbox'
import { login } from '~/middleware/auth-service'

export default {
  components: {
    Input,
    Button,
    Checkbox,
    Icon,
  },
  data() {
    return {
      loginMail: '',
      loginPass: '',
      loginMailError: '',
      loginPassError: '',
      loginRemember: false,
    }
  },
  methods: {
    toggleAuthModal(value) {
      this.$emit('toggleAuthModal', value)
    },
    sendLoginRequest() {
      this.loginMailError = !checkMail(this.loginMail)
        ? 'E-Posta adresiniz hatalı'
        : ''
      this.loginPassError =
        this.loginPass.length < 6 ? 'Şifreniz 6 karakterden az olamaz' : ''

      if (!this.loginMailError && !this.loginPassError) {
        login.bind(this)(this.loginMail, this.loginPass, () => {
          this.$router.push('/init')
        })
      }
    },
    resolveError(errorHandler, newValue) {
      this[errorHandler] = newValue
    },
  },
}
</script>
