<template>
  <div class="storeList">
    <div class="innerWrapper">
      <h1>Dolap</h1>

      <h1 class="titleRight">
        <div class="coin"></div>
        {{ money }}
      </h1>
      <div class="storeModal">
        <div class="leftButtons">
          <div
            v-for="part in ['hair', 'eyes', 'shirt', 'shorts', 'shoes']"
            :key="part"
            class="buttonWrapper"
          >
            <div
              :class="`button ${part} ${modalType === part ? 'active' : ''}`"
              @click="changeTo(part)"
            ></div>
          </div>
          <div
            :class="`button skin ${modalType === 'skin' ? 'active' : ''}`"
            @click="changeTo('skin')"
          >
            <div class="skinCircle" :style="`background:${skinColor}`"></div>
          </div>
        </div>
        <div class="rightSelector">
          <div class="buttons">
            <div
              :class="`left ${buttonVisibility.left ? 'active' : ''}`"
              @click="goLeft()"
            >
              <Icon
                :size="30"
                i="chevron-left"
                stroke="#aaa"
                stroke-width="3"
              />
            </div>
            <div
              :class="`right ${buttonVisibility.right ? 'active' : ''}`"
              @click="goRight()"
            >
              <Icon
                :size="30"
                i="chevron-right"
                stroke="#aaa"
                stroke-width="3"
              />
            </div>
          </div>
          <div
            v-for="part in ['hair', 'eyes', 'shirt', 'shorts', 'shoes', 'skin']"
            :key="part"
            class="part"
          >
            <PartContainer
              :is-visible="modalType === part"
              :type="part"
              :weared="newWorn"
              :wear-item="wearItem"
              :owned="owned"
              :items="computedItems"
              :update-button-visibility="updateButtonVisibility"
              :page="page"
              :set-page="setPage"
              :items-per-page="window.width <= 1200 ? 8 : 16"
            />
          </div>
        </div>
      </div>
      <div class="buyWrapper">
        <Button
          size="big"
          :background="
            wearingLoading === 2
              ? '#9ccc66'
              : wearingLoading === 3
              ? '#ff0066'
              : '#C345FF'
          "
          :disabled="money < totalCost"
          :loading="wearingLoading === 1"
          @click="purchase()"
        >
          <Icon
            :size="48"
            :i="
              wearingLoading === 2
                ? 'save'
                : wearingLoading === 3
                ? 'close'
                : 'basket'
            "
            stroke="#fff"
            stroke-width="1.5"
          />
          <span v-if="totalCost === 0">
            {{
              wearingLoading === 2
                ? 'Kaydedildi'
                : wearingLoading === 3
                ? 'Hata Oluştu'
                : 'Kuşan'
            }}
          </span>
          <span v-else>Satın Al ({{ totalCost }} Altın)</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'
import Button from '~/components/atomic/Button.vue'
import PartContainer from '~/components/store/PartContainer'

export default {
  components: { Icon, PartContainer, Button },
  props: {
    validateItem: {
      type: Function,
      default: () => false,
    },
    skinColor: {
      type: String,
      default: '#fff',
    },
    items: {
      type: Array,
      default: () => [],
    },
    owned: {
      type: Array,
      default: () => [],
    },
    worn: {
      type: Array,
      default: () => [],
    },
    money: {
      type: [Number, String],
      default: 0,
    },
    wearingLoading: {
      type: Number,
      default: 0,
    },
    wearItems: {
      type: Function,
      default: () => [],
    },
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
      modalType: 'hair',
      newWorn: {
        eyes: -1,
        hair: -1,
        shirt: -1,
        shorts: -1,
        shoes: -1,
        skin: -1,
      },
      buttonVisibility: {
        left: false,
        right: false,
      },
      page: 1,
    }
  },
  computed: {
    computedItems() {
      const results = {}
      this.items.forEach((el) => {
        // hair1, eyes1337 etc.
        results[el.type + el.key] = el
      })
      this.owned.forEach((el) => {
        if (results[el.type + el.key]) {
          results[el.type + el.key].owned = true
        }
      })
      return Object.values(results)
    },
    totalCost() {
      let sum = 0
      Object.keys(this.newWorn).forEach((key) => {
        const selectedItem = this.items.find(
          (item) =>
            item.type === key && item.key === this.newWorn[key] && !item.owned
        )
        sum += selectedItem ? selectedItem.cost : 0
      })
      return sum
    },
  },
  watch: {
    worn(newVal) {
      this.newWorn = this.itemArrayToObject(this.worn)
    },
  },
  mounted() {
    this.newWorn = { ...this.newWorn, ...this.itemArrayToObject(this.worn) }
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    itemArrayToObject(arr) {
      const result = {}
      arr.forEach((el) => {
        result[el.type] = el.key
      })
      return result
    },
    itemObjectToArray(obj) {
      const result = []
      Object.keys(obj).forEach((key) => {
        result.push({ type: key, key: obj[key] })
      })
      return result
    },
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    setPage(val) {
      this.page = val
    },
    goLeft() {
      this.page = this.page - 1
    },
    goRight() {
      this.page = this.page + 1
    },
    updateButtonVisibility(left, right) {
      this.buttonVisibility.left = left
      this.buttonVisibility.right = right
    },
    wearItem(type, key) {
      if (this.validateItem(type, key)) {
        this.newWorn[type] = key
        console.log(this.newWorn)
      }
    },
    changeTo(type) {
      this.modalType = type
    },
    purchase() {
      console.log('Satin Alindi | Tutar : ', this.totalCost)
      this.wearItems.bind(this)(this.itemObjectToArray(this.newWorn))
    },
  },
}
</script>

<style lang="scss">
.storeList {
  width: 60vw;
  min-width: 920px;
  height: 100vh;
  position: absolute;
  top: 0;
  right: 0;
  transform: scale(1);
  transform-origin: right center;
  margin-right: 40px;
  z-index: 2;
  transition: 0.3s transform;
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
      .coin {
        display: inline-block;
        width: 70px;
        height: 70px;
        background: #ffc107;
        border-radius: 50%;
      }
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
      .leftButtons {
        .button {
          &.hair {
            background-image: url('/img/store/buttons/hair.svg');
          }
          &.eyes {
            background-image: url('/img/store/buttons/eyes.svg');
          }
          &.shirt {
            background-image: url('/img/store/buttons/shirt.svg');
          }
          &.shorts {
            background-image: url('/img/store/buttons/shorts.svg');
          }
          &.shoes {
            background-image: url('/img/store/buttons/shoes.svg');
          }
          &.skin {
            .skinCircle {
              border-radius: 50%;
              margin: 10px;
              width: calc(100% - 20px);
              height: calc(100% - 20px);
              margin: 10px;
            }
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
        position: relative;
        .buttons {
          .left,
          .right {
            width: 60px;
            height: 60px;
            background: white;
            border: 5px solid #f0f0f0;
            border-radius: 50px;
            position: absolute;
            left: -30px;
            top: 50%;
            transform: translateY(-50%);
            line-height: 45px;
            text-align: center;
            transition: 0.3s all;
            opacity: 0;
            cursor: pointer;
            pointer-events: none;
            &:hover {
              filter: brightness(0.9);
            }
            &.active {
              opacity: 1;
              pointer-events: initial;
            }
          }
          .right {
            left: initial;
            right: -30px;
          }
        }
        .part {
          .subpart {
            overflow: hidden;
            width: calc(100% - 40px);
            height: calc(100% - 40px);
            position: absolute;
          }
          .hairContainer,
          .eyesContainer,
          .shirtContainer,
          .shortsContainer,
          .shoesContainer,
          .skinContainer {
            width: 150px;
            height: 150px;
            border-radius: 15px;
            margin: 15px;
            float: left;
            cursor: pointer;
            background-image: url('/img/item.svg');
            transition: 0.3s filter;
            position: relative;
            filter: drop-shadow(2px 2px 0px transparent)
              drop-shadow(-2px -2px 0px transparent)
              drop-shadow(-2px 2px 0px transparent)
              drop-shadow(2px -2px 0px transparent);
            .selected {
              content: '';
              top: -10px;
              right: -10px;
              position: absolute;
              transform: scale(0);
              transition: 0.3s transform;
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: #87ceeb;
              border: 4px solid white;
              line-height: 40px;
              text-align: center;
            }
            &.locked {
              &.active {
                filter: drop-shadow(2px 2px 0px #ffc107)
                  drop-shadow(-2px -2px 0px #ffc107)
                  drop-shadow(-2px 2px 0px #ffc107)
                  drop-shadow(2px -2px 0px #ffc107);
                .selected {
                  transform: scale(1);
                }
              }
              .selected {
                background: #ffc107;
                transform: scale(0.8);
                color: white;
                font-size: 24px;
                font-weight: 700;
              }
            }
            &.active {
              filter: drop-shadow(2px 2px 0px skyblue)
                drop-shadow(-2px -2px 0px skyblue)
                drop-shadow(-2px 2px 0px skyblue)
                drop-shadow(2px -2px 0px skyblue);
              .selected {
                transform: scale(1);
              }
            }
            .hairItem,
            .eyesItem,
            .shirtItem,
            .shortsItem,
            .shoesItem,
            .skinItem {
              width: 150px;
              height: 150px;
              background-size: 100px;
              background-position: center;
              background-repeat: no-repeat;
            }
          }

          .skinContainer {
            background: transparent;
            .skinItem {
              background-size: 150px;
            }
          }
        }
      }
    }
    .buyWrapper {
      float: right;
      margin-top: 20px;
    }
  }
}

@media only screen and (max-height: 1080px) {
  .storeList {
    transform: scale(0.9);
  }
}

/* WIDTH */

@media only screen and (max-width: 1600px), screen and (max-height: 950px) {
  .storeList {
    transform: scale(0.8);
  }
}

@media only screen and (max-width: 1500px) {
  .storeList {
    transform: scale(0.75);
  }
}

@media only screen and (max-width: 1400px), screen and (max-height: 850px) {
  .storeList {
    transform: scale(0.7);
  }
}

@media only screen and (max-width: 1300px) {
  .storeList {
    transform: scale(0.65);
  }
}

@media only screen and (max-height: 750px) {
  .storeList {
    transform: scale(0.6);
  }
}

@media only screen and (max-width: 1200px) and (orientation: landscape) {
  .storeList {
    bottom: 0;
    top: initial;
    right: 0;
    margin-right: 0px;
    height: 100%;
    min-height: 580px;
    top: 50%;
    transform: translateY(-50%) scale(0.7);
    .innerWrapper {
      max-width: 780px;
      .storeModal {
        float: right;
        width: 540px;
        .leftButtons {
          margin-right: 20px;
        }
        .rightSelector {
          width: 400px;
          height: 100%;
        }
      }
    }
  }
}

@media only screen and (max-width: 1200px) and (orientation: portrait) {
  .storeList {
    width: 100vw;
    bottom: 0;
    top: initial;
    left: 0;
    transform-origin: bottom center;
    margin-bottom: 30px;
    margin-right: 0px;
    height: 650px;
    min-height: 580px;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
    .innerWrapper {
      max-width: 780px;
      h1 {
        display: none;
      }
      .storeModal {
        height: 530px;
        .leftButtons {
          width: 100%;
          height: 130px;
          float: left;
          .button {
            float: left;
            margin-right: 10px;
            margin-bottom: 10px;
          }
        }
        .rightSelector {
          width: 100%;
          height: 400px;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) and (orientation: portrait) {
  .storeList {
    transform: translateX(-50%) scale(0.7);
  }
}

@media only screen and (max-width: 768px) and (orientation: landscape),
  screen and (max-height: 768px) and (max-width: 1200px) and (orientation: landscape) {
  .storeList {
    transform: translateY(-50%) scale(0.5);
  }
}

@media only screen and (max-width: 666px) and (orientation: portrait) {
  .storeList {
    transform: translateX(-50%) scale(0.666);
  }
}
@media only screen and (max-width: 650px) and (orientation: portrait) {
  .storeList {
    transform: translateX(-50%) scale(0.6);
  }
}
@media only screen and (max-width: 550px) and (orientation: portrait) {
  .storeList {
    transform: translateX(-50%) scale(0.54);
  }
}

@media only screen and (max-width: 550px) and (orientation: landscape),
  screen and (max-height: 550px) and (max-width: 1200px) and (orientation: landscape) {
  .storeList {
    transform: translateY(-50%) scale(0.4);
  }
}

@media only screen and (max-width: 500px) and (orientation: portrait) {
  .storeList {
    transform: translateX(-50%) scale(0.49);
  }
}
@media only screen and (max-width: 450px) and (orientation: portrait) {
  .storeList {
    transform: translateX(-50%) scale(0.44);
  }
}

@media only screen and (max-width: 450px) and (orientation: landscape),
  screen and (max-height: 450px) and (max-width: 1200px) and (orientation: landscape) {
  .storeList {
    transform: translateY(-50%) scale(0.3);
  }
}

@media only screen and (max-width: 400px) and (orientation: portrait) {
  .storeList {
    transform: translateX(-50%) scale(0.4);
  }
}
@media only screen and (max-width: 360px) and (orientation: portrait) {
  .storeList {
    transform: translateX(-50%) scale(0.36);
  }
}
</style>
