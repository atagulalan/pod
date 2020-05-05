<template>
  <div class="convertModalWrapper">
    <modal
      name="convertModal"
      transition="scale"
      class="convertModal"
      width="400"
      height="auto"
      @before-close="beforeClose"
    >
      <div class="buttons">
        <textarea id v-model="code" name="paste" cols="15" rows="10">
        </textarea>
        <button @click="convert(code)">CONVERT</button>
      </div>
      <div class="mobileModalExitButton" @click="$modal.hide('convertModal')">
        <Icon :size="36" i="close" stroke="#f00" />
      </div>
    </modal>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    code: {
      type: String,
      default: '',
    },
    convert: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    beforeClose() {
      this.modalType = 'login'
    },
  },
}
</script>

<style lang="scss">
.convertModalWrapper {
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

  .convertModal {
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
      padding-bottom: 70px;
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
}
@media only screen and (max-width: 767px) {
  .convertModalWrapper .convertModal .v--modal {
    width: 100% !important;
    height: 100vh !important;
    left: 0 !important;
    top: 0 !important;
    transform: translate(0, 0);
    background: white;
  }
  .convertModalWrapper .convertModal h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .convertModalWrapper .modalInnerWrapper {
    transform: scale(1) translate(-50%, -50%);
    top: 50% !important;
    left: 50% !important;
    position: relative;
    transform-origin: center;
    padding: 0 10px;
  }
  .convertModalWrapper .mobileModalExitButton {
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
}
</style>
