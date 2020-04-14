<template>
  <div class="resetPassModalWrapper">
    <modal
      name="resetPassModal"
      transition="scale"
      class="resModal"
      width="1000"
      height="auto"
      :click-to-close="false"
    >
      <span class="modalInnerWrapper">
        <h1 class="active">Şifreyi Sıfırla</h1>
        <Input
          v-model="resetPass"
          leading="lock"
          name="pass"
          placeholder="Şifre"
          :error="!!resetPassError"
          error-handler="resetPassError"
          :helper="resetPassError"
          type="password"
          :submit="sendResetPassRequest"
          center
          @resolveError="resolveError"
        />
        <Input
          v-model="resetPassAgain"
          leading="lock"
          name="passAgain"
          placeholder="Şifre (Tekrar)"
          :error="!!resetPassAgainError"
          error-handler="resetPassAgainError"
          :submit="sendResetPassRequest"
          :helper="resetPassAgainError"
          type="password"
          center
          @resolveError="resolveError"
        />
        <div class="subText">
          <span v-if="resetPassSuccess" class="link">
            Şifre sıfırlama başarılı. 5 saniye içinde yönlendiriliyorsunuz...
          </span>
        </div>
        <Button center @click="sendResetPassRequest">
          <Icon
            style="margin-right: 5px;"
            :size="24"
            i="send"
            stroke="#fff"
            stroke-width="1.5"
          />Gönder
        </Button>
        <div class="subText"></div>
      </span>
      <!-- -->
    </modal>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'
import Input from '~/components/atomic/Input.vue'
import Button from '~/components/atomic/Button.vue'
import { reset } from '~/middleware/auth-service'

export default {
  components: {
    Input,
    Button,
    Icon,
  },
  data() {
    return {
      resetPass: '',
      resetPassAgain: '',
      resetPassError: '',
      resetPassAgainError: '',
      resetPassSuccess: false,
    }
  },
  computed: {
    loaded() {
      return this.$store.state.localStorage && this.$store.state.sessionStorage
    },
  },
  methods: {
    sendResetPassRequest() {
      this.resetPassError =
        this.resetPass.length < 6 ? 'Şifreniz 6 karakterden az olamaz' : ''
      this.resetPassAgainError =
        this.resetPass !== this.resetPassAgain ? 'Şifreniz eşleşmiyor' : ''

      if (!this.resetPassError && !this.resetPassAgainError) {
        reset.bind(this)(this.resetPass)
      }
    },

    resolveError(errorHandler, newValue) {
      this[errorHandler] = newValue
    },
  },
}
</script>

<style lang="scss">
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

  .resModal {
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
    .modalInnerWrapper {
      position: relative;
      height: 660px;
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
@media only screen and (max-width: 767px) {
  .resetPassModalWrapper .resModal .modalInnerWrapper {
    height: auto;
  }
  .resetPassModalWrapper .resModal h1 {
    padding-top: 0;
  }
  .resetPassModalWrapper .resModal .v--modal {
    width: 100% !important;
    height: 100vh !important;
    left: 0 !important;
    top: 0 !important;
    transform: translate(0, 0);
    background: white;
  }
}
</style>
