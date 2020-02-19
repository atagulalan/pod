<template>
  <div
    style="display: flex; justify-content: stretch; margin-top: 50px; margin-right: 50px"
  >
    <div class="baseWrapper">
      <Container
        :get-child-payload="getChildPayload1"
        behaviour="copy"
        group-name="1"
        class="hello"
      >
        <Draggable v-for="item in items1" :key="item.id">
          <div class="draggable-item">
            <div :style="item.style" class="cmd">{{ item.text }}</div>
            <div :style="item.style" class="deger dontshow" />
          </div>
        </Draggable>
      </Container>
    </div>
    <div class="codeWrapper">
      <div class="lineNumbers">
        <div v-for="item in items2" :key="item.id" class="item">
          {{ item.lineNumber }}
        </div>
      </div>
      <Container
        :get-child-payload="getChildPayload2"
        :remove-on-drop-out="true"
        :drag-handle-selector="'.cmd'"
        group-name="1"
        @drop="onDrop('items2', $event)"
      >
        <Draggable v-for="(item, index) in items2" :key="item.id">
          <div class="draggable-item">
            <div :style="item.style" class="cmd">{{ item.text }}</div>
            <div
              :style="item.style"
              :class="
                [
                  'deger',
                  item.show ? '' : 'dontshow',
                  index === activeItem ? 'active' : ''
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
    <div class="buttons">
      <button @click="degerAta(1)">1</button>
      <button @click="degerAta(2)">2</button>
      <button @click="degerAta(3)">3</button>
      <button @click="degerAta(4)">4</button>
      <button @click="degerAta(5)">5</button>
      <button @click="degerAta(6)">6</button>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '../middleware/helpers'
const commands = {
  INP: {
    text: 'giris',
    color: '#F5855B'
  },
  OUT: {
    text: 'çıkış',
    color: '#68BBB8'
  },
  ADD: {
    text: 'ekle',
    color: '#00ADEF',
    show: true
  },
  SUB: {
    text: 'çıkart',
    color: '#0077AB',
    show: true
  },
  JMP: {
    text: 'dön',
    color: '#FFD95C',
    return: true
  },
  JMZ: {
    text: 'sıfırsa dön',
    color: '#FCB040'
  },
  CPY: {
    text: 'yere kopyala',
    color: '#0B9444',
    show: true
  },
  GET: {
    text: 'yerden kopyala',
    color: '#056839',
    show: true
  }
}
let uniqueCounter = 0
export default {
  name: 'Copy',
  components: { Container, Draggable },
  data() {
    return {
      items1: generateItems(Object.keys(commands).length, (i) => ({
        id: 'command' + i,
        data: Object.keys(commands)[i],
        text: commands[Object.keys(commands)[i]].text,
        style: 'background:' + commands[Object.keys(commands)[i]].color,
        show: commands[Object.keys(commands)[i]].show,
        value: 0,
        return: commands[Object.keys(commands)[i]].return
      })),
      items2: [],
      activeItem: null
    }
  },
  methods: {
    onDrop(collection, dropResult) {
      if (dropResult.removedIndex === null && dropResult.addedIndex !== null) {
        // ilk birakilma, eger deger varsa aktiflestir
        this.activeItem = dropResult.addedIndex
      }
      if (
        dropResult.removedIndex !== null &&
        dropResult.addedIndex !== null &&
        this.activeItem !== null
      ) {
        this.activeItem = null
      }
      this[collection] = applyDrag(this[collection], dropResult, uniqueCounter)
      uniqueCounter++
    },
    getChildPayload1(index) {
      return this.items1[index]
    },
    getChildPayload2(index) {
      return this.items2[index]
    },
    setActive(i) {
      if (this.activeItem === null) {
        this.activeItem = i
      } else {
        this.activeItem = null
      }
    },
    degerAta(deger) {
      if (this.activeItem !== null) {
        this.items2[this.activeItem].value = deger
        this.activeItem = null
      }
    }
  }
}
</script>

<style lang="scss">
.baseWrapper {
  margin-left: 50px;
  width: 230px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: 510px;
  .smooth-dnd-container {
    padding: 5px;
  }
}

.buttons {
  width: 300px;
  padding: 10px;

  button {
    width: 80px;
    height: 80px;
  }
}

.codeWrapper {
  margin-left: 10px;
  width: 400px;
  max-height: 900px;
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
    font-family: 'Patrick Hand', cursive;
    .item {
      font-size: 18pt;
      width: 50px;
      height: 62px;
    }
  }
  .smooth-dnd-container {
    background: transparent;
    min-height: 100%;
    padding: 0px;
    margin-left: 50px;
  }
}

.draggable-item {
  .cmd,
  .deger {
    text-align: left;
    display: inline-block;
    background-color: #c6c6c6;
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
    cursor: default;
    width: auto;
    padding: 0 20px 4px;
    margin: 3px 0;
    border-radius: 500px;
    color: white;
    font-family: 'Patrick Hand', cursive;
    font-size: 18pt;
    font-weight: bold;
    letter-spacing: 1px;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
    line-height: 50px;
    overflow: visible;
    transition: 0.2s transform;
    cursor: grab;
  }

  .smooth-dnd-ghost .cmd {
    cursor: grabbing !important;
  }

  .deger {
    width: 56px;
    text-align: center;
    cursor: pointer;
    &:hover {
      transform: rotateZ(15deg);
    }
    &.dontshow {
      display: none;
    }
    &.active {
      transform: rotateZ(25deg) scale(0.9);
    }
  }
}
</style>
