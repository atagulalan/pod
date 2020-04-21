<template>
  <div class="gameWrapper">
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
        <div
          v-for="(item, realLine) in items2"
          :key="item.id"
          class="item"
          @mouseover="item.return ? (hover = item.value) : -1"
          @mouseleave="hover = -1"
        >
          <div v-if="realLine === lineNumber" class="arrow"></div>
          {{ item.lineNumber }}
        </div>
      </div>
      <div class="returnSymbols">
        <div
          v-for="item in items2"
          :key="item.id"
          class="item"
          :class="hover === item.value ? 'hover' : ''"
          @mouseover="item.return ? (hover = item.value) : -1"
          @mouseleave="hover = -1"
        >
          <span v-if="item.return || item.notALine">
            <div :class="`shape i${item.value}`"></div>
          </span>
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
          <div
            class="draggable-item"
            @mouseover="item.return ? (hover = item.value) : -1"
            @mouseleave="hover = -1"
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
    <div class="buttons">
      <button @click="setValue(1)">1</button>
      <button @click="setValue(2)">2</button>
      <button @click="setValue(3)">3</button>
      <button @click="setValue(4)">4</button>
      <button @click="setValue(5)">5</button>
      <button @click="setValue(6)">6</button>
      <button @click="run()">RUN</button>
      <button @click="step()">STEP</button>
      <button @click="reset()">RESET</button>
      <button @click="clear()">CLEAR</button>
      <button @click="convert()">CONVERT</button>
      <textarea
        id
        v-model="codeString"
        name="get"
        cols="15"
        rows="10"
        disabled
      ></textarea>
      <textarea id v-model="pasteCode" name="paste" cols="15" rows="10">
      </textarea>
    </div>
    <div class="game">
      <div>lineNumber {{ lineNumber }}</div>
      <div id="hand">
        HAND
        <span class="box">{{ onHand }}</span>
      </div>
      <div id="inputbox">
        INPUT
        <span
          v-for="(item, idx) in inputSection"
          :key="'i' + idx"
          class="box"
          >{{ item }}</span
        >
      </div>
      <div id="middlebox">
        MIDDLE
        <span
          v-for="(item, idx) in middleSection"
          :key="'m' + idx"
          class="box"
          >{{ item }}</span
        >
      </div>
      <div id="outputbox">
        OUTPUT
        <span
          v-for="(item, idx) in outputSection"
          :key="'o' + idx"
          class="box"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag } from '~/middleware/helpers'
import { baseCodes, commands, sanitizeCode, nextLine } from '~/middleware/code'

let uniqueCounter = 0
export default {
  name: 'Copy',
  components: { Container, Draggable },
  data() {
    return {
      items1: baseCodes,
      items2: [],
      activeItem: null,
      hover: -1,
      lineNumber: 0,
      onHand: null,
      jumpBacks: {},
      inputSection: [4, 4, 7, 6, 6, 6, 1, 1],
      middleSection: [],
      outputSection: [],
      winCondition: [4, 6, 1],
      sanitizedArray: [],
      pasteCode: `CME 3
CME 2
INP 0
CPY 0
INP 0
SUB 0
JPZ 1
JMP 2
CME 1
GET 0
OUT 0
JMP 3`,
    }
  },
  computed: {
    codeString() {
      return this.sanitizedArray.join('\n')
    },
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
      this.getTextFromCollection(this[collection])
      uniqueCounter++
    },
    getTextFromCollection(collection) {
      this.sanitizedArray = sanitizeCode(
        collection
          .map((el) => {
            return el.data + ' ' + el.value
          })
          .join('\n')
      )
      this.reset()
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
    setValue(deger) {
      if (this.activeItem !== null) {
        this.items2[this.activeItem].value = deger
        this.getTextFromCollection(this.items2)
        this.activeItem = null
      }
    },
    convert() {
      // converts text to visual
      console.log('converting to visuals')
      this.sanitizedArray = sanitizeCode(this.pasteCode)
      this.reset()
      const results = []
      const returns = []

      let tempLineCounter = 1
      this.sanitizedArray.forEach((el, i) => {
        const [data, value] = el.split(' ')
        if (data === 'JMP' || data === 'JPZ') {
          returns[value] = data
        }
        results.push({
          id: 'command' + i,
          data,
          text: commands[data].text,
          style:
            commands[data].style +
            ';' +
            (commands[data].color ? 'background:' + commands[data].color : ''),
          show: commands[data].show,
          value,
          return: commands[data].return,
          lineNumber: data === 'CME' ? '' : tempLineCounter++,
        })
      })

      console.log(returns)

      results.map((el) => {
        if (el.data === 'CME') {
          el.style =
            el.style + ';background:' + commands[returns[el.value]].color
          el.notALine = true
        }
      })

      this.items2 = results
    },
    clear() {
      this.items2 = []
      this.reset()
    },
    reset() {
      this.lineNumber = 0
      this.onHand = null
      this.jumpBacks = {}
      this.inputSection = [4, 4, 7, 6, 6, 6, 1, 1]
      this.middleSection = []
      this.outputSection = []
      // Set jumpbacks before launch
      this.sanitizedArray.forEach((el, idx) => {
        if (el.split(' ')[0] === 'CME') {
          this.jumpBacks[el.split(' ')[1]] = idx
        }
      })
    },
    error(exception) {
      console.log(`ERROR AT LINE ${this.lineNumber} BECAUSE ${exception}`)
    },
    run() {
      this.reset()
      nextLine.bind(this)(this.sanitizedArray)
    },
    step() {
      nextLine.bind(this)(this.sanitizedArray, true)
    },
  },
}
</script>

<style lang="scss">
.gameWrapper {
  display: flex;
  justify-content: stretch;
  padding: 50px;
  height: 100vh;

  .baseWrapper {
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

  .game {
    .box {
      width: 30px;
      height: 30px;
      background: #ccc;
      margin: 5px;
      display: inline-block;
      line-height: 30px;
      text-align: center;
    }
  }

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

  .draggable-item {
    height: 62px;
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
      font-family: 'Quicksand', sans-serif;
      font-size: 18pt;
      font-weight: bold;
      letter-spacing: -1px;
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
}
</style>
