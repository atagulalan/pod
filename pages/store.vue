<template>
  <div class="storeWrapper">
    <Character :skin-color="skinColor" />
    <StoreList :skin-color="skinColor" :validate-item="validateItem" />
  </div>
</template>

<script>
import Character from '~/components/Character.vue'
import StoreList from '~/components/StoreList.vue'

export default {
  components: {
    Character,
    StoreList,
  },
  data() {
    return {
      skinColor: '#fce6de',
    }
  },
  methods: {
    validateItem(type, item) {
      console.log(type, item)
      // TODO
      if (type === 'skin') {
        this.skinColor = item
      }
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
          border: 2px solid #d8d8d8;
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
