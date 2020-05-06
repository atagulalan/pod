<template>
  <div class="creditsModalWrapper">
    <modal
      name="creditsModal"
      transition="scale"
      class="creditsModal"
      width="480"
      height="auto"
    >
      <div class="mobileModalExitButton" @click="$modal.hide('creditsModal')">
        <Icon :size="36" i="close" stroke="#f00" />
      </div>
      <div>
        <h1>Takım</h1>
        <button :style="{ marginLeft: '12px' }" @click="openDev('atagulalan')">
          <img
            class="creditsImg"
            :src="'https://avatars1.githubusercontent.com/u/8681330?s=460&v=4'"
          />
          <h3>Ata Gülalan</h3>
          <h4>@atagulalan</h4>
        </button>
        <button @click="openDev('oguzturker8')">
          <img
            class="creditsImg"
            :src="'https://avatars2.githubusercontent.com/u/33129613?s=460&v=4'"
          />
          <h3>Oğuzhan Türker</h3>
          <h4>@oguzturker8</h4>
        </button>
        <button @click="openDev('stunali')">
          <img
            class="creditsImg"
            :src="'https://avatars3.githubusercontent.com/u/32413273?s=460&v=4'"
          />
          <h3>Serdar Tunalı</h3>
          <h4>@stunali</h4>
        </button>
        <h2>
          Oyun hakkındaki soru, görüş ve hata geri bildirimleri için
          <span :style="{ color: '#46cb92' }">support@wepod.io</span> adresinden
          bize ulaşabilirsiniz.
        </h2>
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
  methods: {
    openDev(tag) {
      const win = window.open('https://github.com/' + tag, '_blank')
      win.focus()
    },
  },
}
</script>

<style lang="scss">
.creditsModalWrapper {
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

  .creditsModal {
    .v--modal {
      box-shadow: none;
      background-image: url('/img/popup.svg');
      background-size: cover;
      background-color: transparent;
      transform: translate(-50%, -50%);
      top: 50vh !important;
      left: 50vw !important;
    }
    .creditsImg {
      width: 50px;
      height: 50px;
      border-radius: 500px;
      margin-top: 20px;
    }
    h1 {
      font-size: 24px;
      padding-top: 70px;
      padding-bottom: 20px;
      padding-right: 30px;
      padding-left: 30px;
      color: black;
      font-weight: 500;
      cursor: default;
      text-align: center;
    }
    h2 {
      font-size: 18px;
      padding-bottom: 70px;
      padding-right: 30px;
      padding-left: 30px;
      color: black;
      font-weight: 600;
      cursor: default;
      text-align: center;
    }
    h3 {
      font-size: 16px;
      color: black;
      font-weight: 600;
      cursor: default;
      text-align: center;
    }
    h4 {
      font-size: 14px;
      padding-bottom: 20px;
      color: black;
      font-weight: 500;
      cursor: default;
      text-align: center;
    }

    button {
      cursor: pointer;
      font-size: 20pt;
      font-weight: 600;
      width: 30%;
      margin-bottom: 20px;
      overflow: hidden;
      min-width: 100px;
      max-width: 500px;
      text-align: center;
      color: #fff;
      background-color: transparent;
      border: 0;
      border-bottom: 0.2px solid #fff;
      transition: border-color 0.3s linear;

      &:hover {
        filter: brightness(1.1);
        border-color: #46cb92;
      }
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
  .creditsModalWrapper .creditsModal .v--modal {
    width: 100% !important;
    height: 100vh !important;
    left: 0 !important;
    top: 0 !important;
    transform: translate(0, 0);
    background: white;
  }
  .creditsModalWrapper .creditsModal h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .creditsModalWrapper .modalInnerWrapper {
    transform: scale(1) translate(-50%, -50%);
    top: 50% !important;
    left: 50% !important;
    position: relative;
    transform-origin: center;
    padding: 0 10px;
  }
  .creditsModalWrapper .mobileModalExitButton {
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
