<template>
  <div class="storeList">
    <div class="innerWrapper">
      <h1>Mağaza</h1>
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
          <div v-if="modalType === 'hair'" class="hair"></div>
          <div v-if="modalType === 'eyes'" class="eyes"></div>
          <div v-if="modalType === 'shirt'" class="shirt"></div>
          <div v-if="modalType === 'shorts'" class="shorts"></div>
          <div v-if="modalType === 'shoes'" class="shoes"></div>
          <div v-if="modalType === 'skin'" class="skin">
            <div
              v-for="(skin, i) in skins"
              :key="'skin-' + i"
              class="skinContainer"
              :style="`background:${skin}`"
              @click="validateItem('skin', skin)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    validateItem: {
      type: Function,
      default: () => {
        return false
      },
    },
    skinColor: {
      type: String,
      default: '#fff',
    },
  },
  data() {
    return {
      modalType: 'hair',
      skins: [
        '#fce6de',
        '#ffdcc5',
        '#ffd7b4',
        '#ffcbab',
        '#ffc089',
        '#ffaf7c',
        '#df8e62',
        '#c5815b',
        '#ad735b',
        '#774939',
        '#603829',
        '#442b26',
        '#def9de',
        '#f7d2f5',
        '#fcd2d2',
        '#e4def9',
      ],
    }
  },
  methods: {
    changeTo(type) {
      console.log(type)
      this.modalType = type
    },
  },
}
</script>

<style lang="scss">
.skinContainer {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 15px;
  float: left;
  cursor: pointer;
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
</style>
