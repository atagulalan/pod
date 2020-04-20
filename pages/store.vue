<template>
  <div class="storeWrapper">
    <style>
      .skin {
        fill: {{ skinColor }};
      }
    </style>
    <transition name="fade">
      <div v-if="!loaded" class="loadingWrapper">
        <div class="infinityChrome">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <span v-else>
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
    </transition>
  </div>
</template>

<script>
import Character from '~/components/Character.vue'
import StoreList from '~/components/StoreList.vue'
import { listItems, wearItems } from '~/middleware/store'

export default {
  components: {
    Character,
    StoreList,
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.7s;
    transition-delay: 1s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .loadingWrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .infinityChrome {
    width: 128px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .infinityChrome div {
    position: absolute;
    width: 16px;
    height: 16px;
    background: #ff4c60;
    box-shadow: 2px 2px 8px rgba(255, 76, 96, 0.09);
    border-radius: 50%;
    animation: moveSvg 6.9s linear infinite;
    -webkit-filter: url(#goo);
    filter: url(#goo);
    transform: scaleX(-1);
    offset-path: path(
      'M64.3636364,29.4064278 C77.8909091,43.5203348 84.4363636,56 98.5454545,56 C112.654545,56 124,44.4117395 124,30.0006975 C124,15.5896556 112.654545,3.85282763 98.5454545,4.00139508 C84.4363636,4.14996252 79.2,14.6982509 66.4,29.4064278 C53.4545455,42.4803627 43.5636364,56 29.4545455,56 C15.3454545,56 4,44.4117395 4,30.0006975 C4,15.5896556 15.3454545,4.00139508 29.4545455,4.00139508 C43.5636364,4.00139508 53.1636364,17.8181672 64.3636364,29.4064278 Z'
    );
  }
  .infinityChrome div:before,
  .infinityChrome div:after {
    content: '';
    position: absolute;
    display: block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background: inherit;
    top: 50%;
    left: 50%;
    margin: -7px 0 0 -7px;
    box-shadow: inherit;
  }
  .infinityChrome div:before {
    animation: drop1 0.8s linear infinite;
  }
  .infinityChrome div:after {
    animation: drop2 0.8s linear infinite 0.4s;
  }
  .infinityChrome div:nth-child(2) {
    animation-delay: -2.3s;
  }
  .infinityChrome div:nth-child(3) {
    animation-delay: -4.6s;
  }
  @keyframes moveSvg {
    0% {
      offset-distance: 0%;
    }
    25% {
      background: #6c6ce5;
    }
    75% {
      background: #ffd15c;
    }
    100% {
      offset-distance: 100%;
    }
  }
  @keyframes drop1 {
    100% {
      transform: translate(32px, 8px) scale(0);
    }
  }
  @keyframes drop2 {
    0% {
      transform: translate(0, 0) scale(0.9);
    }
    100% {
      transform: translate(32px, -8px) scale(0);
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
    }
  }
  .storeList {
    width: 60vw;
    height: 100vh;
    float: left;
    position: relative;
    z-index: 2;
    .innerWrapper {
      max-width: 921px;
      width: 100%;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      h1 {
        font-size: 96px;
        color: #505668;
        line-height: 120px;
        margin-bottom: 40px;
        display: inline-block;
      }
      h1.titleRight {
        float: right;
        margin-right: 10px;
      }
      .storeModal {
        width: 100%;
        height: 780px;
        .leftButtons {
          width: 120px;
          height: 100%;
          margin-right: 36px;
          float: left;
          .button {
            width: 120px;
            height: 120px;
            background-color: #9ccc66;
            border-radius: 50%;
            margin: 0 0 10px;
            text-align: center;
            line-height: 120px;
            color: white;
            transition: 0.3s filter, 0.3s border, 0.3s background-color;
            cursor: pointer;
            font-size: 30pt;
            padding: 10px;
            &:hover {
              filter: brightness(1.1);
            }
            &.active {
              background-color: #c1e498;
              border: 4px solid #9ccc66;
            }
          }
        }
        .rightSelector {
          width: calc(100% - 156px);
          height: 100%;
          float: left;
          border-radius: 30px;
          background: url(/img/store.svg);
          padding: 20px;
        }
      }
      .store-decline {
        float: right;
        width: 60px;
        height: 60px;
        margin-right: 36px;
        svg {
          stroke: #ce3e5d;
        }
      }
      .store-confirm {
        float: right;
        width: 60px;
        height: 60px;
        margin-right: 36px;
        svg {
          stroke: #9ccc66;
        }
      }
    }
  }
}
</style>
