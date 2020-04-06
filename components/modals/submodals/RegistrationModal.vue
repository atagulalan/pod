<template>
  <span class="modalInnerWrapper">
    <h1 class="active">Bir hesap oluştur</h1>
    <Input
      v-model="registerMail"
      leading="envelope"
      name="email"
      placeholder="E-Posta"
      :error="!!registerMailError"
      error-handler="registerMailError"
      :helper="registerMailError"
      type="email"
      :submit="sendRegisterRequest"
      center
      @resolveError="resolveError"
    />
    <Input
      v-model="registerPass"
      leading="lock"
      name="pass"
      placeholder="Şifre"
      :error="!!registerPassError"
      error-handler="registerPassError"
      :helper="registerPassError"
      type="password"
      :submit="sendRegisterRequest"
      center
      @resolveError="resolveError"
    />
    <Input
      v-model="registerPassAgain"
      leading="lock"
      name="passAgain"
      placeholder="Şifre (Tekrar)"
      :error="!!registerPassAgainError"
      error-handler="registerPassAgainError"
      :submit="sendRegisterRequest"
      :helper="registerPassAgainError"
      type="password"
      center
      @resolveError="resolveError"
    />
    <div class="checkboxes">
      <Checkbox
        v-model="registerRemember"
        name="remember"
        :default="false"
        :required="true"
        :error="registerRememberError"
        error-handler="registerRememberError"
        @resolveError="resolveError"
        >Kullanım koşullarını kabul ediyorum</Checkbox
      >
    </div>
    <Button center style="margin-top:10px" @click="sendRegisterRequest">
      <Icon :size="24" i="entrance" stroke="#fff" stroke-width="1.5" />Kayıt Ol
    </Button>
    <div class="subText">
      Hesabın var mı?
      <span class="link" @click="toggleAuthModal('login')">Giriş Yap</span>
    </div>
  </span>
</template>

<script>
import { checkMail } from '~/middleware/helpers'
import Icon from '~/components/atomic/Icon'
import Input from '~/components/atomic/Input'
import Button from '~/components/atomic/Button'
import Checkbox from '~/components/atomic/Checkbox'
import { register } from '~/middleware/auth-service'

export default {
  components: {
    Input,
    Button,
    Checkbox,
    Icon
  },
  data() {
    return {
      registerMail: '',
      registerPass: '',
      registerPassAgain: '',
      registerMailError: '',
      registerPassError: '',
      registerPassAgainError: '',
      registerRememberError: false,
      registerRemember: false
    }
  },
  methods: {
    toggleAuthModal(value) {
      this.$emit('toggleAuthModal', value)
    },
    sendRegisterRequest() {
      this.registerMailError = !checkMail(this.registerMail)
        ? 'E-Posta adresiniz hatalı'
        : ''
      this.registerPassError =
        this.registerPass.length < 6 ? 'Şifreniz 6 karakterden az olamaz' : ''
      this.registerPassAgainError =
        this.registerPass !== this.registerPassAgain
          ? 'Şifreniz eşleşmiyor'
          : ''
      this.registerRememberError = !this.registerRemember

      if (
        !this.registerMailError &&
        !this.registerPassError &&
        !this.registerPassAgainError &&
        !this.registerRememberError
      ) {
        register(this.registerMail, this.registerPass)
      }
    },
    resolveError(errorHandler, newValue) {
      this[errorHandler] = newValue
    }
  }
}
</script>
