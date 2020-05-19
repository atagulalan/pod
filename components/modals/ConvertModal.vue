<template>
  <div class="convertModalWrapper">
    <modal
      name="convertModal"
      transition="scale"
      class="convertModal"
      width="800"
      height="800"
      @before-close="beforeClose"
    >
      <div class="modalInnerWrapper">
        <h1>Kodu Kopyala</h1>
        <p>
          Buradan halihazırda yazmış olduğun kodu kopyalayabilir, veya kod
          yapıştırabilirsin.
        </p>
        <textarea
          id
          v-model="pasteCode"
          class="codeTextArea"
          name="paste"
          cols="15"
          rows="10"
        >
        </textarea>

        <Button
          v-clipboard:copy="pasteCode"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          size="fit"
          :background="copyButton.background"
          >{{ copyButton.text }}</Button
        >

        <Button
          size="fit"
          :background="saveButton.background"
          :color="saveButton.color"
          @click="convertAndClose()"
          >{{ saveButton.text }}</Button
        >
        <div class="mobileModalExitButton" @click="$modal.hide('convertModal')">
          <Icon :size="36" i="close" stroke="#f00" />
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'
import Button from '~/components/atomic/Button.vue'

export default {
  components: {
    Button,
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
  data() {
    return {
      pasteCode: '',
      copyButton: {
        background: '#c345ff',
        text: 'Kodu Kopyala',
        timeout: null,
      },
      saveButton: {
        background: '#9ccc66',
        color: '#fff',
        text: 'Kaydet',
        timeout: null,
      },
    }
  },
  watch: {
    code(newCode) {
      this.pasteCode = newCode
    },
  },
  methods: {
    convertAndClose() {
      let error
      try {
        this.convert(this.pasteCode)
      } catch (err) {
        error = err
        this.saveButton.text = 'Kaydedilemedi!'
        this.saveButton.color = '#fff'
        this.saveButton.background = '#ff4f5b'
        clearTimeout(this.saveButton.timeout)
        this.saveButton.timeout = setTimeout(() => {
          this.saveButton.background = '#9ccc66'
          this.saveButton.color = '#fff'
          this.saveButton.text = 'Kaydet'
        }, 4000)
      }
      if (!error) {
        this.$modal.hide('convertModal')
      }
    },
    onCopy() {
      this.copyButton.background = '#9ccc66'
      this.copyButton.text = 'Kopyalandı!'
      clearTimeout(this.copyButton.timeout)
      this.copyButton.timeout = setTimeout(() => {
        this.copyButton.background = '#c345ff'
        this.copyButton.text = 'Kodu Kopyala'
      }, 4000)
    },
    onError() {
      this.copyButton.background = '#ff4f5b'
      this.copyButton.text = 'Hata!'
      clearTimeout(this.copyButton.timeout)
      this.copyButton.timeout = setTimeout(() => {
        this.copyButton.background = '#c345ff'
        this.copyButton.text = 'Kodu Kopyala'
      }, 4000)
    },
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
    transform: scale(1.5) translateX(-33.3%);
    transform-origin: top;
    position: absolute;
    width: 420px;
    left: 50%;
    text-align: center;
  }

  p {
    text-align: center;
  }

  .codeTextArea {
    width: 100%;
    border-radius: 20px;
    border: 1px solid #dddddd;
    padding: 20px;
    height: 220px;
    margin: 20px 0;
  }

  .buttonWrapper {
    display: inline-block;
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
