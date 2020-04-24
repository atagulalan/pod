<template>
  <div class="gameWrapper">
    <OpCode :opcodes="opcodes" />
    <Code
      :code-lines="codeLines"
      :on-drop="onDrop"
      :active-item="activeItem"
      :line-number="lineNumber"
      :hover="hover"
      :set-hover="(i) => (hover = i)"
      :set-active="setActive"
    />
    <div class="gameArea">
      <InputRoller :input="inputSection" />
      <MiddleSection :set-value="setValue" :n="6" :items="middleSection" />
      <OutputRoller :output="outputSection" />
    </div>

    <div class="buttons">
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
  </div>
</template>

<script>
import { applyDrag } from '~/middleware/helpers'
import { baseCodes, commands, sanitizeCode, nextLine } from '~/middleware/code'
import Code from '~/components/game/Code'
import OpCode from '~/components/game/OpCode'
import MiddleSection from '~/components/game/MiddleSection'
import InputRoller from '~/components/game/InputRoller'
import OutputRoller from '~/components/game/OutputRoller'

let uniqueCounter = 0
export default {
  name: 'Copy',
  components: { OpCode, Code, MiddleSection, InputRoller, OutputRoller },
  data() {
    return {
      opcodes: baseCodes,
      codeLines: [],
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
    setActive(i) {
      if (this.activeItem === null) {
        this.activeItem = i
      } else {
        this.activeItem = null
      }
    },
    setValue(deger) {
      if (this.activeItem !== null) {
        this.codeLines[this.activeItem].value = deger
        this.getTextFromCollection(this.codeLines)
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
          value: Number(value),
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

      this.codeLines = results
    },
    clear() {
      this.codeLines = []
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
