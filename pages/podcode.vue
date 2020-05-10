<template>
  <div class="gameWrapper">
    <div v-if="activeItem !== null" class="focusHelper"></div>
    <div class="codeMenu">
      <div class="info">
        <h1>{{ mission }}</h1>
        <h2>{{ info }}</h2>
        <div class="ada"></div>
      </div>
      <Code
        :code-lines="codeLines"
        :on-drop="onDrop"
        :active-item="activeItem"
        :line-number="podInstance.lineNumber"
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
    <OpCode class="opCodeMenu" :opcodes="opcodes" />
    <div class="gameArea">
      <div class="scaler">
        <InputRoller :input="podInstance.inputSection" />
        <MiddleSection
          :set-value="setValue"
          :n="6"
          :width-limit="3"
          :items="podInstance.middleSection"
          :focus="activeItem !== null"
        />
        <OutputRoller :output="podInstance.outputSection" />
        <Character
          :skin-color="characterCustomization.skin"
          :eyes="characterCustomization.eyes"
          :hair="characterCustomization.hair"
          :shirt="characterCustomization.shirt"
          :shorts="characterCustomization.short"
          :shoes="characterCustomization.shoes"
          :holding="podInstance.onHand"
          :class="characterAt"
        />
      </div>
    </div>
    <ConvertModal :code="codeString" />
  </div>
</template>

<script>
import { applyDrag } from '~/middleware/helpers'
import {
  baseCodes,
  commands,
  sanitizeCode,
  PodInstance,
} from '~/middleware/code'
import { getCode, sendCode } from '~/middleware/game'
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
      codeLines: [],
      activeItem: null,
      hover: -1,
      sanitizedArray: [],
      pasteCode: `CME 1
      INP 0
      OUT 0
      JMP 1`,
      mission: 'Görev: Yükleniyor...',
      info: 'Yükleniyor...',
      restrictedCodeBlocks: ['INP', 'OUT', 'CPY', 'GET', 'JMP'],
      characterAt: '',
      characterCustomization: {
        skin: '#fce6de',
        shoes: '0',
        shorts: '0',
        eyes: '0',
        shirt: '0',
        hair: '0',
      },
      tests: [],
      podInstance: {
        inputSection: [],
        lineNumber: 0,
        middleSection: [],
        winCondition: [],
        n: 0,
        onHand: null,
        outputSection: [],
        tests: [],
      },
      congratz: false,
    }
  },
  computed: {
    codeString() {
      return this.sanitizedArray.join('\n')
    },
    opcodes() {
      return baseCodes.filter((code) =>
        this.restrictedCodeBlocks.includes(code.data)
      )
    },
  },
  mounted() {
    getCode
      .bind(this)(this.$route.params.id)
      .then((data) => {
        this.characterCustomization = data.user.worn.reduce(function (
          result,
          item
        ) {
          const key = item.type
          result[key] = item.key
          return result
        },
        {})

        this.mission = data.chapter.episodes.mission
        this.info = data.chapter.episodes.info
        this.tests = data.chapter.episodes.tests

        this.convert(this.pasteCode)

        console.log('Pod Instance:', this.podInstance)
      })
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
      this.podInstance = new PodInstance(
        {
          tests: this.tests,
        },
        (returnObj) => {
          console.log(returnObj)

          let testCount = 1
          this.tests.forEach((test, i) => {
            if (i === 0) return
            console.log('Testing:', test)
            const testInstance = new PodInstance(
              {
                inputSection: test.input,
                winCondition: test.output,
                logs: [],
              },
              (status) => {
                if (status.type === 'bravo') {
                  console.log('Test', i, 'başarılı.')
                  testCount++
                }
              }
            )
            console.log(testInstance)
            testInstance.nextLine.bind(this)(this.sanitizedArray)
          })

          const testsSuccessful = testCount === this.tests.length

          // if all tests are good, send backend the code
          if (testsSuccessful && this.congratz === false) {
            this.congratz = true
            console.log(this.sanitizedArray)
            sendCode.bind(this)(
              this.$route.params.id,
              this.sanitizedArray.join('\n')
            )
          } else if (this.congratz === true) {
            console.log('Zaten yollandı, istek cevabı bekleniyor...')
          } else {
            // TODO make alternative test main one.
          }
        },
        (e) => (this.lineNumber = e),
        (e) => (this.onHand = e)
      )
    },
    error(exception) {
      console.log(`ERROR AT LINE ${this.lineNumber} BECAUSE ${exception}`)
    },
    run() {
      this.reset()
      this.podInstance.nextLine.bind(this)(this.sanitizedArray)
    },
    step() {
      this.podInstance.nextLine.bind(this)(
        this.sanitizedArray,
        (e) => {
          this.characterAt = e[0] + e[1]
        },
        true
      )
    },
  },
}
</script>

<style lang="scss">
.gameWrapper {
  padding: 50px;
  height: 100vh;

  .box {
    width: 40px;
    height: 40px;
    line-height: 40px;
    float: right;
    background: #ff4f5b;
    border: 1px solid #1a2e35;
    color: white;
    text-align: center;
  }

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

  .codeMenu {
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    overflow: hidden;
    height: 100%;
    width: 400px;
    float: left;
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

  .opCodeMenu {
    float: left;
  }

  .gameArea {
    width: calc(100vw - 700px);
    height: 100vh;
    right: 0;
    top: 0;
    position: absolute;
    z-index: 33;

    .scaler {
      width: 685px;
      transform: scale(1.5);
      transform-origin: top left;
    }

    .character {
      width: 150px;
      position: absolute;
      z-index: 30;
      transition: 0.2s left, 0.2s top;
      left: 60px;
      top: 90px;

      &.INP0 {
        left: 550px;
        top: 20px;
      }

      &.OUT0 {
        left: 550px;
        top: 390px;
      }

      &.GET0,
      &.CPY0 {
        left: 170px;
        top: 100px;
      }

      &.GET1,
      &.CPY1 {
        left: 250px;
        top: 100px;
      }

      &.GET2,
      &.CPY2 {
        left: 350px;
        top: 100px;
      }

      &.GET3,
      &.CPY3 {
        left: 100px;
        top: 250px;
      }

      &.GET4,
      &.CPY4 {
        left: 230px;
        top: 270px;
      }

      &.GET5,
      &.CPY5 {
        left: 310px;
        top: 270px;
      }
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
