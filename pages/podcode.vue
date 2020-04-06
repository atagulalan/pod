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
      <button @click="run()">RUN</button>
      <button @click="step()">STEP</button>
      <button @click="reset()">RESET</button>
      <button @click="clear()">CLEAR</button>
    </div>
    <div>lineNumber {{ lineNumber }}</div>
    <div class="game">
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
import { applyDrag, generateItems } from '~/middleware/helpers'

class PodCode {
  constructor(code) {
    this.code = code
  }

  removeSpecial(e) {
    this.code = this.code.replace(/[^A-Za-z0-9 ]/g, '')
    return this
  }

  onlyOneSpace(e) {
    this.code = this.code.replace(/\s\s+/g, ' ')
    return this
  }

  removeComments(e) {
    this.code = this.code.replace(/--.*--/g, ' ')
    return this
  }

  breakLines(e) {
    this.code = this.code.replace(/([A-Z][A-Z][A-Z])/g, '\n$1')
    return this
  }

  trim(e) {
    this.code = this.code.trim()
    return this
  }

  validate(e) {
    // tüm işlemler gerçekleştirildikten sonra
    // her satırın okunup okunamadığını kontrol
    // et.
  }
}

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
    color: '#FCB040',
    return: true
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
      codeString: '',
      activeItem: null,
      hover: -1,
      lineNumber: 0,
      onHand: null,
      jumpBacks: {},
      inputSection: [4, 4, 7, 6, 6, 6, 1, 1],
      middleSection: [],
      outputSection: [],
      winCondition: [4, 4, 7, 6, 6, 6, 1, 1],
      sanitizedArray: []
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
      this.getTextFromCollection(this[collection])
      uniqueCounter++
    },
    getTextFromCollection(collection) {
      this.codeString = collection
        .map((el) => {
          return el.data + ' ' + el.value
        })
        .join('\n')

      this.sanitizedArray = new PodCode(this.codeString)
        .removeSpecial()
        .onlyOneSpace()
        .removeComments()
        .breakLines()
        .trim()
        .code.split('\n')

      this.reset()

      console.log(this.codeString)
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
        this.getTextFromCollection(this.items2)
        this.activeItem = null
      }
    },
    clear() {
      this.items2 = []
      this.reset()
    },
    reset() {
      this.lineNumber = 0
      this.onHand = null
      this.jumpBacks = {}
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
      this.nextLine(this.sanitizedArray)
    },
    step() {
      this.nextLine(this.sanitizedArray, true)
    },
    nextLine(arr, dont) {
      if (arr[this.lineNumber] === undefined) {
        console.log('bitti')
        return
      }
      if (
        JSON.stringify(this.winCondition) ===
          JSON.stringify(this.outputSection) &&
        this.inputSection.length === 0
      ) {
        console.log('bravo')
        return
      }
      const commandAndValue = arr[this.lineNumber].split(' ')
      const next = function(newLineNumber) {
        if (!isNaN(newLineNumber)) {
          this.lineNumber = newLineNumber
        } else {
          this.lineNumber = this.lineNumber + 1
        }

        // document.getElementById('line').style.top = lineNumber * 18 + 'px'
        // document.getElementById('hand').textContent = onHand
        console.log(
          'Durum:',
          this.lineNumber,
          this.onHand,
          this.jumpBacks,
          this.inputSection,
          this.middleSection,
          this.outputSection
        )

        if (!dont) {
          this.nextLine(arr)
        }
      }.bind(this)
      const fns = {
        CME(e) {
          next()
        },
        INP: () => {
          console.log('Kutuyu alıyorum')
          this.onHand = this.inputSection.shift()
          if (!this.onHand) {
            this.error('Alacak hiçbir kutu yok')
          } else {
            next()
          }
        },
        OUT: () => {
          console.log('Kutuyu Veriyorum')
          if (this.onHand) {
            this.outputSection.push(this.onHand)
            this.onHand = null
            next()
          } else {
            this.error('Ellerim bomboş')
          }
        },
        CPY: (e) => {
          console.log('Kopyalıyorum')
          this.middleSection[e] = this.onHand
          next()
        },
        SUB: (e) => {
          if (this.onHand !== undefined) {
            console.log('Çıkartıyorum')
            this.onHand -= this.middleSection[e]
            next()
          } else {
            this.error()
          }
        },
        ADD: (e) => {
          if (this.onHand !== null) {
            console.log('Ekliyorum')
            this.onHand += this.middleSection[e]
            next()
          } else {
            this.error()
          }
        },
        JPZ: (e) => {
          if (this.onHand === 0) {
            fns.JMP(e)
          } else {
            next()
          }
        },
        JMP: (e) => {
          console.log('Atlıyorum:', e)
          console.log(this.jumpBacks[e])
          next(this.jumpBacks[e])
        },
        GET: (e) => {
          if (this.middleSection[e] !== undefined) {
            this.onHand = this.middleSection[e]
            next()
          } else {
            this.error()
          }
        }
      }
      fns[commandAndValue[0]](commandAndValue[1])
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
    font-family: 'Patrick Hand', cursive;
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
