<template>
  <div class="gameWrapper">
    <EpisodeModal
      :stars="stars"
      :info="`Bravo!`"
      :mission="`Bölüm Başarılı`"
      :active-episode="this.$route.params.id"
      :in-game="true"
      :forest="this.$route.params.id"
    />
    <div v-if="activeItem !== null" class="focusHelper"></div>
    <div class="codeMenu">
      <div class="info">
        <h1>{{ mission }}</h1>
        <h2>{{ info }}</h2>
        <popper
          ref="adaRef"
          trigger="focus"
          :force-show="force"
          :disabled="false"
          :options="{
            trigger: 'hover',
            placement: 'left',
            modifiers: { offset: { offset: '0px' } },
          }"
        >
          <div class="popper adaSays" @click="showNextLine()">
            <span>{{ adaSays.text[adaSays.line] }}</span>
            <small v-if="adaSays.text.length - 1 === adaSays.line"
              >Kapatmak için tıkla</small
            >
            <small v-else>Devam etmek için tıkla</small>
          </div>

          <div slot="reference" class="ada" @click="showNextLine()"></div>
        </popper>
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
        <button class="text" @click="getText()"></button>
      </div>
    </div>
    <OpCode class="opCodeMenu" :opcodes="opcodes" />
    <div ref="gameArea" class="gameArea">
      <div ref="scaler" class="scaler" :style="`transform:scale(${scaleBy})`">
        <InputRoller :input="podInstance.inputSection" />
        <MiddleSection
          :set-value="setValue"
          :n="memory[0]"
          :width-limit="memory[1]"
          :items="podInstance.middleSection"
          :focus="activeItem !== null"
        />
        <OutputRoller :output="podInstance.outputSection" />
        <Character
          ref="character"
          :skin-color="characterCustomization.skin"
          :eyes="characterCustomization.eyes"
          :hair="characterCustomization.hair"
          :shirt="characterCustomization.shirt"
          :shorts="characterCustomization.short"
          :shoes="characterCustomization.shoes"
          :holding="podInstance.onHand"
          :class="characterAt"
          :style="characterStyle"
        />
      </div>
    </div>
    <ConvertModal :code="codeString" :convert="convert" />
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
import Code from '~/components/game/Code.vue'
import OpCode from '~/components/game/OpCode.vue'
import MiddleSection from '~/components/game/MiddleSection.vue'
import InputRoller from '~/components/game/InputRoller.vue'
import OutputRoller from '~/components/game/OutputRoller.vue'
import ConvertModal from '~/components/modals/ConvertModal.vue'
import EpisodeModal from '~/components/modals/EpisodeModal.vue'
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
    EpisodeModal,
    Character,
  },
  data() {
    return {
      adaSays: {
        line: -1,
        text: [],
      },
      codeLines: [],
      activeItem: null,
      hover: -1,
      sanitizedArray: [],
      pasteCode: `CME 0
      INP 0
      OUT 0
      JMP 0`,
      mission: 'Görev: Yükleniyor...',
      info: 'Yükleniyor...',
      restrictedCodeBlocks: [],
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
      activeTest: null,
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
      minScores: {
        exec: 0,
        lines: 0,
      },
      stars: [0, 0, 0],
      memory: [0, 0],
      force: false,
      characterStyle: ``,
      scaleBy: 1,
      isRunning: false,
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
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

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
        this.activeTest = this.tests[0]
        this.adaSays.text = this.activeTest.text
        this.adaSays.line = 0
        this.minScores = data.chapter.episodes.scores.min
        this.memory = data.chapter.episodes.memory
        this.restrictedCodeBlocks = data.chapter.episodes.codeBlocks

        this.convert(this.pasteCode)

        this.force = true
        this.$refs.adaRef.doShow()
        console.log('Ada:', this.$refs.adaRef)

        console.log('Pod Instance:', this.podInstance)
      })
  },
  methods: {
    handleResize() {
      if (this.$refs.gameArea && this.$refs.scaler) {
        const wrapper = this.$refs.gameArea.getBoundingClientRect()
        const content = {
          width: this.$refs.scaler.offsetWidth,
          height: this.$refs.scaler.offsetHeight,
        }
        const s = Math.min(
          wrapper.width / content.width,
          wrapper.height / content.height
        )
        this.scaleBy = s
      }
    },
    setTransition(t, o) {
      console.log('Setting time:', t, o)
      this.characterStyle = `transition: ${t}ms left cubic-bezier(0.4, 0.4, 0.4, 1) 0s, ${t}ms top cubic-bezier(0.4, 0.4, 0.4, 1) 0s; left: ${o.left}px; top: ${o.top}px;`
    },
    showNextLine() {
      if (this.adaSays.line === -1) {
        this.$refs.adaRef.doShow()
      }
      this.adaSays.line = Number(this.adaSays.line + 1)
      console.log(this.adaSays.line)
      if (this.adaSays.line === this.adaSays.text.length) {
        this.$refs.adaRef.doClose()
        this.adaSays.line = -1
      }
    },
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
          tests: [this.activeTest],
          character: this.$refs.character,
          setTransition: this.setTransition,
        },
        (returnObj) => {
          console.log(returnObj)
          if (returnObj.type === 'bravo') {
            this.stars = [
              1,
              this.minScores.lines >= this.sanitizedArray.length,
              this.minScores.exec >= returnObj.exec,
            ]

            let testCount = 1
            this.tests.forEach((test, i) => {
              if (i === 0) return
              console.log('Testing:', test)
              const testInstance = new PodInstance(
                {
                  inputSection: test.input,
                  winCondition: test.output,
                  logs: [],
                  noWait: true,
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
            console.log(testCount, this.tests.length)

            // if all tests are good, send backend the code
            if (testsSuccessful /* && this.congratz === false */) {
              this.congratz = true
              console.log(this.sanitizedArray)
              sendCode
                .bind(this)(
                  this.$route.params.id,
                  this.sanitizedArray.join('\n')
                )
                .then((e) => {
                  if (e.code === 'tests_successful') {
                    console.log('başardın dostum')
                    this.$modal.show('episodeModal')
                    this.congratz = false
                  }
                })
            } else if (this.congratz === true) {
              console.log('Zaten yollandı, istek cevabı bekleniyor...')
            } else {
              // TODO make alternative test main one.
            }
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
      if (!this.isRunning) {
        // START
        this.reset()
        this.podInstance.nextLine.bind(this)(this.sanitizedArray)
      } else {
        // STOP
      }
    },
    step() {
      this.podInstance.nextLine.bind(this)(
        this.sanitizedArray,
        (e) => {
          // this.characterAt = e[0] + e[1]
        },
        true
      )
    },
    getText() {
      this.$modal.show('convertModal')
    },
  },
}
</script>

<style lang="scss">
.gameWrapper {
  padding: 50px;
  height: 100vh;
  background: #b8d75f;
  background-size: cover;

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
    height: 100%;
    width: 400px;
    float: left;
    background: #fff;
    .info {
      height: 200px;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 20px 20px 0 0;
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
      .adaSays {
        max-width: 300px;
        font-size: 18pt;
        pointer-events: initial;
        text-align: left;
        small {
          text-align: right;
          font-size: 10pt;
          display: block;
        }
      }
    }

    .buttons {
      padding: 10px;
      text-align: center;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 0 0 20px 20px;
      button {
        width: 70px;
        height: 70px;
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
        &.run.stop {
          background-image: url(/img/game/buttons/stop.svg);
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
        &.text {
          background-image: url(/img/game/buttons/text.svg);
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
    align-items: center;
    display: flex;
    justify-items: center;

    .scaler {
      width: 685px;
      transform-origin: center left;
    }

    .character {
      width: 150px;
      position: absolute;
      z-index: 30;
      left: 60px;
      top: 90px;

      &.GET0,
      &.PY0 {
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
