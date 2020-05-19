<template>
  <div class="storeWrapper">
    <div :class="`loadingWrapper ${loaded ? 'animate' : ''}`"></div>
    <span v-if="loaded">
      <MobileMenu
        title="Dolap"
        :back="
          () => {
            this.$router.push('/init')
          }
        "
      >
        <h1 class="titleRight">
          <div class="coin"></div>
          {{ money }}
        </h1>
      </MobileMenu>
      <Character
        :skin-color="skinColor"
        :eyes="eyes"
        :hair="hair"
        :shirt="shirt"
        :shorts="shorts"
        :shoes="shoes"
      />
      <StoreList
        :items="items"
        :skin-color="skinColor"
        :validate-item="validateItem"
        :owned="owned"
        :money="money"
        :worn="worn"
        :wearing-loading="wearingLoading"
        :wear-items="wear"
      />
    </span>
  </div>
</template>

<script>
import Character from '~/components/Character.vue'
import StoreList from '~/components/StoreList.vue'
import MobileMenu from '~/components/atomic/MobileMenu.vue'
import { listItems, wearItems } from '~/middleware/store'

export default {
  components: {
    Character,
    StoreList,
    MobileMenu,
  },
  data() {
    return {
      money: 0,
      skinColor: '#fce6de',
      eyes: '0',
      hair: '0',
      shirt: '0',
      shorts: '0',
      shoes: '0',
      items: [],
      owned: [],
      worn: [],
      loaded: false,
      wearingLoading: 0,
    }
  },
  mounted() {
    listItems.bind(this)()
  },
  methods: {
    validateItem(type, item) {
      console.log(type, item)
      // TODO
      if (type === 'skin') {
        this.skinColor = item
      } else if (type === 'eyes') {
        this.eyes = item
      } else if (type === 'hair') {
        this.hair = item
      } else if (type === 'shirt') {
        this.shirt = item
      } else if (type === 'shorts') {
        this.shorts = item
      } else if (type === 'shoes') {
        this.shoes = item
      }

      // TODO
      return true
    },
    wear(...params) {
      wearItems.bind(this)(...params)
    },
  },
}
</script>

<style lang="scss">
.storeWrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url('/img/memphis-colorful.png');
  background-repeat: repeat;
  &::before {
    content: '';
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 75%,
      rgba(255, 255, 255, 1) 100%
    );
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }

  .mobileMenu {
    .titleRight {
      float: right;
      .coin {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: #ffc107;
        border-radius: 50%;
        vertical-align: text-top;
      }
    }
  }

  .character {
    width: 40vw;
    height: 100%;
    position: relative;
    float: left;
    svg {
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
      height: 100%;
      width: 100%;
    }
  }
}

@media only screen and (max-width: 1200px) and (orientation: portrait) {
  .storeWrapper {
    .mobileMenu {
      display: block;
    }
    .character {
      width: 100vw;
      height: calc(100vh - 600px);
      border-top: 100px solid transparent;
      svg {
        top: initial;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}

@media only screen and (max-width: 768px) and (orientation: portrait) {
  .storeWrapper .character {
    height: calc(100vh - 520px);
  }
}
@media only screen and (max-width: 666px) and (orientation: portrait) {
  .storeWrapper .character {
    height: calc(100vh - 480px);
  }
}
@media only screen and (max-width: 650px) and (orientation: portrait) {
  .storeWrapper .character {
    height: calc(100vh - 440px);
  }
}
@media only screen and (max-width: 550px) and (orientation: portrait) {
  .storeWrapper .character {
    height: calc(100vh - 400px);
  }
}
@media only screen and (max-width: 500px) and (orientation: portrait) {
  .storeWrapper .character {
    height: calc(100vh - 340px);
  }
}
@media only screen and (max-width: 450px) and (orientation: portrait) {
  .storeWrapper .character {
    height: calc(100vh - 340px);
  }
}
@media only screen and (max-width: 400px) and (orientation: portrait) {
  .storeWrapper .character {
    height: calc(100vh - 320px);
  }
}
@media only screen and (max-width: 360px) and (orientation: portrait) {
  .storeWrapper .character {
    height: calc(100vh - 300px);
  }
}
</style>
