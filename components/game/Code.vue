<template>
  <div class="codeWrapper">
    <div class="lineNumbers">
      <div
        v-for="(item, realLine) in codeLines"
        :key="item.id"
        class="item"
        @mouseover="item.return ? setHover(item.value) : -1"
        @mouseleave="setHover(-1)"
      >
        <div v-if="realLine === lineNumber" class="arrow"></div>
        {{ item.lineNumber }}
      </div>
    </div>
    <div class="returnSymbols">
      <div
        v-for="item in codeLines"
        :key="item.id"
        class="item"
        :class="hover === item.value ? 'hover' : ''"
        @mouseover="item.return ? setHover(item.value) : -1"
        @mouseleave="setHover(-1)"
      >
        <span v-if="item.return || item.notALine">
          <div :class="`shape i${item.value}`"></div>
        </span>
      </div>
    </div>
    <Container
      :get-child-payload="getCodeLine"
      :remove-on-drop-out="true"
      :drag-handle-selector="'.cmd'"
      group-name="1"
      @drop="onDrop('codeLines', $event)"
    >
      <Draggable v-for="(item, index) in codeLines" :key="item.id">
        <div
          class="draggable-item"
          @mouseover="item.return ? setHover(item.value) : -1"
          @mouseleave="setHover(-1)"
        >
          <div :style="item.style" class="cmd">{{ item.text }}</div>
          <div
            :style="item.style"
            :class="
              [
                'deger',
                item.show ? '' : 'dontshow',
                index === activeItem ? 'active' : '',
              ].join(' ')
            "
            @click="setActive(index)"
          >
            {{ item.value }}
          </div>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  components: {
    Container,
    Draggable,
  },
  props: {
    codeLines: {
      type: Array,
      default: () => [],
    },
    activeItem: {
      type: Number,
      default: 0,
    },
    lineNumber: {
      type: Number,
      default: 0,
    },
    hover: {
      type: Number,
      default: -1,
    },
    onDrop: {
      type: Function,
      default: () => {},
    },
    setHover: {
      type: Function,
      default: () => {},
    },
    setActive: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    getCodeLine(index) {
      return this.codeLines[index]
    },
  },
}
</script>

<style lang="scss">
.codeWrapper {
  margin-left: 10px;
  width: 400px;
  height: 100%;
  overflow: auto;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;

  .lineNumbers {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: auto;
    z-index: 3;
    line-height: 62px;
    text-align: center;
    color: gray;
    font-family: 'Quicksand', sans-serif;
    margin-left: 20px;
    .item {
      font-size: 18pt;
      width: 50px;
      height: 62px;
      position: relative;
      .arrow {
        position: absolute;
        width: 25px;
        height: 31px;
        left: -20px;
        top: 12.5px;
        background-image: url('/img/playButton.png');
        background-size: contain;
      }
    }
  }
  .returnSymbols {
    position: absolute;
    left: 50px;
    top: 0;
    width: 50px;
    height: auto;
    z-index: 3;
    line-height: 62px;
    text-align: center;
    color: gray;
    font-family: 'Quicksand', sans-serif;
    .item {
      font-size: 18pt;
      width: 50px;
      height: 62px;
      position: relative;
      .shape {
        position: absolute;
        width: 30px;
        height: 30px;
        left: 10px;
        top: 15px;
        background-size: contain;
        @for $i from 1 through 14 {
          &.i#{$i} {
            background-image: url('/img/symbols/#{$i}.png');
          }
        }
      }
      &:before {
        content: '';
        background: #f3f3f3;
        border: 2px solid grey;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        display: block;
        left: 5px;
        top: 10px;
        position: absolute;
        z-index: -1;
        opacity: 0;
        transition: 0.3s opacity;
      }
      &.hover {
        &:before {
          opacity: 1;
        }
      }
    }
  }
  .smooth-dnd-container {
    background: transparent;
    min-height: 100%;
    padding: 0px;
    margin-left: 100px;
  }
}
</style>
