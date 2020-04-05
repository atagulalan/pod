<template>
  <div :class="['heroWrapper']">
    <div id="wrapper">
      <div class="inner">
        <logo />
        <span v-if="$store.state.localStorage.user.id.email">
          Günaydın, {{ $store.state.localStorage.user.id.email }}
          <a href="#" class="login" @click="logout">
            <Icon :size="24" i="exit" stroke="#fff" />Çıkış Yap
          </a>
        </span>
        <span v-else>
          <a href="#" class="login" @click="show">
            <Icon :size="24" i="entrance" stroke="#fff" />Giriş Yap
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'
import Logo from '~/components/atomic/Logo.vue'

export default {
  components: {
    Logo,
    Icon
  },
  props: {
    vProgress: {
      type: Function,
      default: () => {}
    },
    vComplete: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    loaded() {
      return this.$store.state.localStorage && this.$store.state.sessionStorage
    }
  },
  methods: {
    async logout() {
      const logoutResult = await this.$axios.$post(
        'http://localhost:5000/api/auth/logout'
      )
      console.log(logoutResult)
      if (logoutResult.success) {
        this.$store.commit('localStorage/resetUser')
      }
    },
    show() {
      this.$modal.show('registrationModal')
    },
    hide() {
      this.$modal.hide('registrationModal')
    }
  }
}
</script>

<style lang="scss">
.heroWrapper {
  width: 100%;
  height: auto;
  position: relative;
  z-index: 0;

  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    80% {
      transform: translateY(0px);
    }
    100% {
      opacity: 1;
    }
  }

  hr {
    border: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(135deg, #6f9941 0%, #787dd2 100%);
  }

  #wrapper {
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #252821;
    position: relative;
    overflow: hidden;

    .inner {
      max-width: 500px;
      text-align: center;
      animation: fadein 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
      opacity: 0;

      &:after,
      &:before {
        content: '';
        pointer-events: none;
        transition: 0.3s opacity;
        position: absolute;
        opacity: 0;
      }

      &:after {
        background: rgba(19, 20, 24, 0.8);
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 33;
      }
      &:before {
        border: 5px dashed #44a5e8;
        left: 30px;
        top: 30px;
        right: 30px;
        bottom: 0px;
        z-index: 34;
      }
    }

    p {
      padding: 20pt 0 50pt;
      font-size: 18pt;
      font-weight: 300;
    }

    .login {
      color: #252821;
      display: block;
      padding: 10px 20px;
      font-weight: 300;
      font-size: 16pt;
      z-index: 32;
      position: relative;
      transition: 0.3s filter;
      width: 180px;
      margin: 30px auto 0;
      &:before {
        content: '';
        width: 100%;
        left: 0;
        background: linear-gradient(
          135deg,
          rgba(111, 153, 65, 1) 0%,
          rgba(111, 153, 65, 1) 100%
        );
        height: 3px;
        position: absolute;
        bottom: -20px;
        transition: 0.2s bottom, 0.15s opacity;
        opacity: 0;
        pointer-events: none;
      }
      &:hover {
        &:before {
          bottom: -10px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
