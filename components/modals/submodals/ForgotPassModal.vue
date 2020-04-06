<template>
  <span class="modalInnerWrapper">
    <h1 class="active">Şifremi Unuttum</h1>
    <Input
      v-model="forgotPassMail"
      leading="envelope"
      name="email"
      placeholder="E-Posta"
      :error="!!forgotPassError"
      :helper="forgotPassError"
      type="email"
      center
    />
    <div class="subText">
      <span v-if="forgotPassSent" class="link"
        >Sıfırlama bağlantısı E-Posta adresine gönderildi</span
      >
    </div>
    <Button center :loading="forgotPassLoading" @click="sendForgotPassRequest">
      <Icon
        style="margin-right:5px"
        :size="24"
        i="send"
        stroke="#fff"
        stroke-width="1.5"
      />Gönder
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
import { forgotPass } from '~/middleware/auth-service'

export default {
  components: {
    Input,
    Button,
    Icon
  },
  data() {
    return {
      forgotPassMail: '',
      forgotPassError: '',
      forgotPassSent: false,
      forgotPassLoading: false
    }
  },
  methods: {
    toggleAuthModal(value) {
      this.$emit('toggleAuthModal', value)
    },
    sendForgotPassRequest() {
      this.forgotPassError = !checkMail(this.forgotPassMail)
        ? 'E-Posta adresiniz hatalı'
        : ''
      if (!this.forgotPassError) {
        this.forgotPassLoading = true
        forgotPass(this.forgotPassMail)
      }
    }
  }
}
</script>
