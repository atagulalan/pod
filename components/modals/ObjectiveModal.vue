<template>
  <div class="objectiveModalWrapper">
    <modal
      name="objectiveModal"
      transition="scale"
      class="objectiveModal"
      width="540"
      height="auto"
    >
      <div class="mobileModalExitButton" @click="$modal.hide('objectiveModal')">
        <Icon :size="36" i="close" stroke="#f00" />
      </div>
      <h1>Amacımız</h1>
      <h2 class="objText">
        Bu uygulamayı geliştirmedeki amacımız çocuklara erken yaşta algoritma
        öğreterek, tüketen değil üreten çocuklar yetiştirmek. Çocuklara erken
        yaşta algoritma öğretmek matematik, fen bilimleri alanında gelişmesini,
        ayrıca problemlere farklı bakış açısı İle bakmalarını sağlar.
        Uygulamamız 21. yüzyıl insanında olması gereken algoritmik, yaratıcı
        düşünce mantığını çocuklara aşılamayı amaçlar.
      </h2>
    </modal>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'

export default {
  components: {
    Icon,
  },
}
</script>

<style lang="scss">
.objectiveModalWrapper {
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

  .objectiveModal {
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
      font-size: 24px;
      padding-top: 70px;
      padding-bottom: 40px;
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
  .objectiveModalWrapper .objectiveModal .v--modal {
    width: 100% !important;
    height: 100vh !important;
    left: 0 !important;
    top: 0 !important;
    transform: translate(0, 0);
    background: white;
  }
  .objectiveModalWrapper .objectiveModal h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .objectiveModalWrapper .modalInnerWrapper {
    transform: scale(1) translate(-50%, -50%);
    top: 50% !important;
    left: 50% !important;
    position: relative;
    transform-origin: center;
    padding: 0 10px;
  }
  .objectiveModalWrapper .mobileModalExitButton {
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
