<template>
  <div class="gameWrapper">
    <div class="codeMenu">
      <div class="info">
        <h1>Görev: Döndür</h1>
        <h2>
          Bize gelen kutular yanlış sıralanmış. Her iki kutunun yerini
          değiştirmen gerekiyor. Yapabilir misin?
        </h2>
        <div class="ada"></div>
      </div>
      <Code
        :code-lines="codeLines"
        :on-drop="onDrop"
        :active-item="activeItem"
        :line-number="lineNumber"
        :hover="hover"
        :set-hover="(i) => (hover = i)"
        :set-active="setActive"
      />
      <div class="buttons">
        <button class="run" @click="run()"></button>
        <button class="step" @click="step()"></button>
        <button class="reset" @click="reset()"></button>
        <button class="clear" @click="clear()"></button>
      </div>
    </div>
    <OpCode :opcodes="opcodes" />
    <div class="gameArea">
      <div v-if="activeItem !== null" class="focusHelper"></div>
      <InputRoller :input="inputSection" />
      <MiddleSection
        :set-value="setValue"
        :n="6"
        :width-limit="3"
        :items="middleSection"
        :focus="activeItem !== null"
      />
      <OutputRoller :output="outputSection" />
      <Character
        :skin-color="`#fce6de`"
        :eyes="'0'"
        :hair="'0'"
        :shirt="'0'"
        :shorts="'0'"
        :shoes="'0'"
      />
    </div>
    <ConvertModal :code="codeString" />
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
import ConvertModal from '~/components/modals/ConvertModal'
import Character from '~/components/Character.vue'

let uniqueCounter = 0
export default {
  name: 'Copy',
  components: {
    OpCode,
    Code,
    MiddleSection,
    InputRoller,
    OutputRoller,
    ConvertModal,
    Character,
  },
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
      pasteCode: ``,
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
        if (dropResult.payload.show) {
          this.activeItem = dropResult.addedIndex
        }
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
    convert(pasteCode) {
      // converts text to visual
      console.log('converting to visuals')
      this.sanitizedArray = sanitizeCode(pasteCode)
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

  .codeMenu {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    overflow: hidden;

    .info {
      height: 200px;
      background: rgba(0, 0, 0, 0.05);
      margin-bottom: 5px;
      position: relative;
      padding: 10px 20px;

      h1 {
        color: #83828c;
      }
      h2 {
        color: #636368;
        width: 320px;
        font-weight: 500;
      }

      .ada {
        width: 80px;
        height: 80px;
        background: url(/img/game/ada/normal1.svg);
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    .buttons {
      padding: 10px;
      text-align: center;
      background: rgba(0, 0, 0, 0.05);
      button {
        width: 80px;
        height: 80px;
        background-color: #9ccc66;
        border-radius: 50%;
        margin: 0 0 10px;
        text-align: center;
        color: white;
        transition: 0.3s filter, 0.3s border, 0.3s background-color;
        cursor: pointer;
        border: 4px solid transparent;
        &:hover {
          background-color: #c1e498;
          border: 4px solid #9ccc66;
        }
        &:active {
          background-color: #9ccc66;
        }

        &.run {
          background-image: url(/img/game/buttons/run.svg);
        }
        &.step {
          background-image: url(/img/game/buttons/step.svg);
        }
        &.reset {
          background-image: url(/img/game/buttons/reset.svg);
        }
        &.clear {
          background-image: url(/img/game/buttons/clear.svg);
        }
      }
    }
  }

  .gameArea {
    .focusHelper {
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.4);
      z-index: 33;
      left: 0;
      top: 0;
      position: absolute;
      backdrop-filter: blur(2px);
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
