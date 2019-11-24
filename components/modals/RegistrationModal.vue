<template>
  <div class="registrationModalWrapper">
    <modal
      name="registrationModal"
      transition="scale"
      class="regModal"
      width="680"
      height="550"
    >
      <h1 class="active">
        Hesabına giriş yap
      </h1>
      <Input
        leading="envelope"
        name="email"
        placeholder="E-Posta"
        type="email"
        center
      />
      <Input
        leading="lock"
        name="pass"
        placeholder="Şifre"
        type="password"
        center
      />
      <div class="loginProps">
        <Checkbox name="remember">
          Beni hatırla
        </Checkbox>
      </div>
      <Button center style="margin-top:10px">
        <Icon :size="24" i="entrance" stroke="#fff" stroke-width="1.5" />
        Giriş Yap
      </Button>
      <div class="registerText">
        Hesabın yok mu?
        <span class="link">Kayıt Ol</span>
      </div>
    </modal>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss">
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
      border-radius: 20px;
      box-shadow: 0 20px 100px -40px rgba(0, 0, 0, 0.5);
    }
    h1 {
      font-size: 18px;
      padding-top: 70px;
      padding-bottom: 50px;
      color: black;
      font-weight: 500;
      cursor: default;
      text-align: center;
    }
  }

  .loginProps {
    width: 346px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 15px;
    text-align: center;
  }

  .registerText {
    text-align: center;
    font-size: 11pt;
    margin-top: 30px;
    .link {
      color: #6f9941;
      font-weight: 500;
      cursor: pointer;
    }
  }
}
</style>
