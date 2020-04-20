<template>
  <div class="storeList">
    <div class="innerWrapper">
      <h1>Mağaza</h1>
      <div class="coin">
        <div class="coin__front"></div>
        <div class="coin__edge">
          <div v-for="index in 80" :key="index"></div>
        </div>
        <div class="coin__back"></div>
      </div>
      <h1 class="titleRight">{{ money }}</h1>
      <div class="storeModal">
        <div class="leftButtons">
          <div
            :class="`button hair ${modalType === 'hair' ? 'active' : ''}`"
            @click="changeTo('hair')"
          ></div>
          <div
            :class="`button eyes ${modalType === 'eyes' ? 'active' : ''}`"
            @click="changeTo('eyes')"
          ></div>
          <div
            :class="`button shirt ${modalType === 'shirt' ? 'active' : ''}`"
            @click="changeTo('shirt')"
          ></div>
          <div
            :class="`button shorts ${modalType === 'shorts' ? 'active' : ''}`"
            @click="changeTo('shorts')"
          ></div>
          <div
            :class="`button shoes ${modalType === 'shoes' ? 'active' : ''}`"
            @click="changeTo('shoes')"
          ></div>
          <div
            :class="`button skin ${modalType === 'skin' ? 'active' : ''}`"
            @click="changeTo('skin')"
          >
            <div class="skinCircle" :style="`background:${skinColor}`"></div>
          </div>
        </div>
        <div class="rightSelector">
          <div
            v-for="part in ['hair', 'eyes', 'shirt', 'shorts', 'shoes', 'skin']"
            :key="part"
            class="part"
          >
            <PartContainer
              v-if="modalType === part"
              :type="part"
              :weared="changed ? newWorn : weared"
              :wear-item="wearItem"
              :owned="owned"
              :items="computedItems"
            />
          </div>
        </div>
      </div>
      <div class="buyWrapper">
        <Button
          size="big"
          :background="wearingLoading === 2 ? '#9ccc66' : '#C345FF'"
          :disabled="money < totalCost"
          :loading="wearingLoading === 1"
          @click="purchase()"
        >
          <Icon
            :size="48"
            :i="wearingLoading === 2 ? 'save' : 'basket'"
            stroke="#fff"
            stroke-width="1.5"
          />
          <span v-if="totalCost === 0">
            {{ wearingLoading === 2 ? 'Kaydedildi' : 'Kuşan' }}
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
      modalType: 'hair',
      newWorn: {
        eyes: -1,
        hair: -1,
        shirt: -1,
        shorts: -1,
        shoes: -1,
        skin: -1,
      },
      changed: false,
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
    weared() {
      const result = {}
      this.worn.forEach((el) => {
        result[el.type] = el.key
      })
      return result
    },
    totalCost() {
      const ha = this.changed ? this.newWorn : this.weared
      let sum = 0
      Object.keys(ha).forEach((key) => {
        const selectedItem = this.items.find(
          (item) => item.type === key && item.key === ha[key] && !item.owned
        )
        sum += selectedItem ? selectedItem.cost : 0
      })
      return sum
    },
  },
  methods: {
    wearItem(type, key) {
      const neutralized = this.newWorn
      Object.keys(this.newWorn).forEach((el) => {
        if (neutralized[el] === -1) {
          delete neutralized[el]
        }
      })

      this.changed = true
      this.newWorn = { ...this.weared, ...neutralized }
      if (this.validateItem(type, key)) {
        this.newWorn[type] = key
      }
    },
    changeTo(type) {
      console.log(type)
      this.modalType = type
    },
    purchase() {
      console.log('Satin Alindi | Tutar : ', this.totalCost)
      const worn = this.changed ? this.newWorn : this.weared
      const wornArray = []
      Object.keys(worn).forEach((key) => {
        wornArray.push({ type: key, key: worn[key] })
      })
      this.wearItems.bind(this)(wornArray)
    },
  },
}
</script>

<style lang="scss">
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
  filter: drop-shadow(1px 1px 0px transparent)
    drop-shadow(1px 1px 0px transparent) drop-shadow(-1px -1px 0px transparent)
    drop-shadow(-1px -1px 0px transparent) drop-shadow(-1px 1px 0px transparent)
    drop-shadow(-1px 1px 0px transparent) drop-shadow(1px -1px 0px transparent)
    drop-shadow(1px -1px 0px transparent);
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
      filter: drop-shadow(1px 1px 0px #ffc107) drop-shadow(1px 1px 0px #ffc107)
        drop-shadow(-1px -1px 0px #ffc107) drop-shadow(-1px -1px 0px #ffc107)
        drop-shadow(-1px 1px 0px #ffc107) drop-shadow(-1px 1px 0px #ffc107)
        drop-shadow(1px -1px 0px #ffc107) drop-shadow(1px -1px 0px #ffc107);
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
    filter: drop-shadow(1px 1px 0px skyblue) drop-shadow(1px 1px 0px skyblue)
      drop-shadow(-1px -1px 0px skyblue) drop-shadow(-1px -1px 0px skyblue)
      drop-shadow(-1px 1px 0px skyblue) drop-shadow(-1px 1px 0px skyblue)
      drop-shadow(1px -1px 0px skyblue) drop-shadow(1px -1px 0px skyblue);
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

.eyesContainer {
  width: 150px;
  height: 75px;
  .eyesItem {
    width: 150px;
    height: 75px;
  }
}

.buyWrapper {
  float: right;
  margin-top: 20px;
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

//COININ ANIMASYONU OLABILIR DE OLAMYABILIR DE
$coin-diameter: 96px;
$coin-thickness: 8px;
$coin-color: #ffcc01;
$coin: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4yIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8Y2lyY2xlIGZpbGw9IiNGRkQ3MTUiIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPGNpcmNsZSBmaWxsPSIjRkZDQzAxIiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyMTcuMyIvPg0KCQk8L2c+DQoJPC9nPg0KCTxwYXRoIGZpbGw9IiNFNjlBMjQiIGQ9Ik0zNTEuNywxNzljMS43LTUuMywyLjYtMTAuOSwyLjYtMTYuOGMwLTI4LjgtMjEuNy01Mi41LTQ5LjYtNTUuNmMtMTAtMTUuMy0yNy4zLTI1LjUtNDctMjUuNQ0KCQljLTE5LjUsMC0zNi43LDEwLTQ2LjgsMjUuMmMtMjkuNiwxLjUtNTMuMiwyNi01My4yLDU2YzAsNS44LDAuOSwxMS41LDIuNiwxNi44Yy05LjksMTAuMS0xNi4xLDI0LTE2LjEsMzkuM2MwLDMwLjksMjUuMSw1Niw1Niw1Ng0KCQljMS45LDAsMy43LTAuMSw1LjUtMC4zYzQuMSwxMC4xLDExLjEsMTguOCwxOS45LDI1djEwMy4yYzAsNy4zLDUuOSwxMy4zLDEzLjMsMTMuM2gzNC4xYzcuMywwLDEzLjMtNS45LDEzLjMtMTMuM1YzMDEuMg0KCQljMTAuNC02LjIsMTguNi0xNS42LDIzLjItMjdjMC43LDAsMS41LDAuMSwyLjIsMC4xYzMwLjksMCw1Ni0yNS4xLDU2LTU2QzM2Ny44LDIwMywzNjEuNywxODkuMSwzNTEuNywxNzl6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==);
$edge-faces: 80;
$edge-face-length: 3.14 * $coin-diameter/$edge-faces;
$turn-time: 8s;

.coin {
  padding-top: 12px;
  float: right;
  position: relative;
  width: $coin-diameter;
  height: $coin-diameter;
  margin: 0px auto;
  transform-style: preserve-3d;
  animation: rotate3d $turn-time linear infinite;
  transition: all 0.3s;
  display: inline-block;
}

.coin__front,
.coin__back {
  position: absolute;
  width: $coin-diameter;
  height: $coin-diameter;
  border-radius: 50%;
  overflow: hidden;
  background-color: $coin-color;

  &:after {
    content: '';
    position: absolute;
    left: -$coin-diameter/2;
    bottom: 100%;
    display: block;
    height: $coin-diameter/1.5;
    width: $coin-diameter * 2;
    background: #fff;
    opacity: 0.3;
    animation: shine linear $turn-time/2 infinite;
  }
}

.coin__front {
  background-image: $coin;
  background-size: cover;
  transform: translateZ($coin-thickness/2);
}
.coin__back {
  background-image: $coin;
  background-size: cover;
  transform: translateZ(-$coin-thickness/2) rotateY(180deg);
}

.coin__edge {
  @for $i from 1 through $edge-faces {
    div:nth-child(#{$i}) {
      position: absolute;
      height: $edge-face-length;
      width: $coin-thickness;
      background: $coin-color;
      transform: translateY(#{$coin-diameter/2-$edge-face-length/2})
        translateX(#{$coin-diameter/2-$coin-thickness/2})
        rotateZ(360deg / $edge-faces * $i + 90)
        translateX(#{$coin-diameter/2})
        rotateY(90deg);
    }
  }
}

@keyframes rotate3d {
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }

  100% {
    transform: perspective(1000px) rotateY(360deg);
  }
}

@keyframes shine {
  0%,
  15% {
    transform: translateY($coin-diameter * 2) rotate(-40deg);
  }
  50% {
    transform: translateY(-$coin-diameter) rotate(-40deg);
  }
}
</style>
