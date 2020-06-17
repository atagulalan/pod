import Vue from 'vue'

export const commands = {
  INP: {
    text: 'giris',
    color: '#F5855B',
  },
  OUT: {
    text: 'çıkış',
    color: '#68BBB8',
  },
  ADD: {
    text: 'ekle',
    color: '#00ADEF',
    show: true,
  },
  SUB: {
    text: 'çıkart',
    color: '#0077AB',
    show: true,
  },
  JMP: {
    text: 'dön',
    color: '#FFD95C',
    return: true,
  },
  JPZ: {
    text: 'sıfırsa dön',
    color: '#FCB040',
    return: true,
  },
  CPY: {
    text: 'yere kopyala',
    color: '#0B9444',
    show: true,
  },
  GET: {
    text: 'yerden kopyala',
    color: '#056839',
    show: true,
  },
  CME: {
    text: '',
    color: '#056839',
    notALine: true,
    style: 'height:56px;width:56px',
    return: true,
  },
}

export const positions = {
  INP: {
    left: 550,
    top: 20,
  },
  OUT: {
    left: 550,
    top: 390,
  },
  CPY0: {
    left: 170,
    top: 130,
  },
  CPY1: {
    left: 300,
    top: 100,
  },
  CPY2: {
    left: 160,
    top: 270,
  },
  CPY3: {
    left: 270,
    top: 270,
  },
  GET0: {
    left: 170,
    top: 130,
  },
  GET1: {
    left: 300,
    top: 100,
  },
  GET2: {
    left: 160,
    top: 270,
  },
  GET3: {
    left: 270,
    top: 270,
  },
  SUB0: {
    left: 170,
    top: 130,
  },
  SUB1: {
    left: 300,
    top: 100,
  },
  SUB2: {
    left: 160,
    top: 270,
  },
  SUB3: {
    left: 270,
    top: 270,
  },
  ADD0: {
    left: 170,
    top: 130,
  },
  ADD1: {
    left: 300,
    top: 100,
  },
  ADD2: {
    left: 160,
    top: 270,
  },
  ADD3: {
    left: 270,
    top: 270,
  },
}

export const calculateHypo = (o1, o2) => {
  return Math.sqrt((o1.left - o2.left) ** 2 + (o1.top - o2.top) ** 2)
}

export const calculateTime = (distance) => {
  return Math.floor(distance * 1.4)
}

export const go = (character, type, setTransition) => {
  if (character) {
    let time = calculateTime(
      calculateHypo(
        {
          left: character.offsetLeft,
          top: character.offsetTop,
        },
        positions[type]
      )
    )
    time = time < 1050 ? 1050 : time
    setTransition(time, positions[type])
    return time
  }
}

export class PodCode {
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

  removeNotCommands(e) {
    this.code = this.code
      .split('\n')
      .filter((el) => commands[el.split(' ')[0]] !== undefined)
      .join('\n')
    return this
  }

  normalizeValues(e) {
    this.code = this.code
      .split('\n')
      .map(
        (el) =>
          el.split(' ')[0] +
          ' ' +
          el.split(' ')[1].match(/\d+/g).map(Number).join('')
      )
      .join('\n')
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

export const generateItems = (count, creator) => {
  const result = []
  for (let i = 0; i < count; i++) {
    const createdCommand = creator(i)
    if (createdCommand.notALine !== true) {
      result.push(createdCommand)
    }
  }
  return result
}

export const baseCodes = generateItems(Object.keys(commands).length, (i) => ({
  id: 'command' + i,
  data: Object.keys(commands)[i],
  text: commands[Object.keys(commands)[i]].text,
  style:
    commands[Object.keys(commands)[i]].style +
    ';background:' +
    commands[Object.keys(commands)[i]].color,
  show: commands[Object.keys(commands)[i]].show,
  value: 0,
  return: commands[Object.keys(commands)[i]].return,
  notALine: commands[Object.keys(commands)[i]].notALine,
}))

export const sanitizeCode = function (nonSanitizedCode) {
  if (!nonSanitizedCode) return []
  const sanitized = new PodCode(nonSanitizedCode)
    .removeSpecial()
    .onlyOneSpace()
    .removeComments()
    .breakLines()
    .removeNotCommands()
    .normalizeValues()
    .trim()
    .code.split('\n')
  return sanitized
}

export class PodInstance {
  n = 0
  logs = []
  lockedUntil = 0
  allowToGoOn = false
  maxJump = 500
  jump = 0

  stop = () => {
    this.n = 0
    this.lockedUntil = +new Date()
    this.allowToGoOn = false
  }

  runDat = (type, cb) => {
    if (this.noWait) {
      cb()
    } else {
      let dur = 500
      if (type !== '') {
        dur = go(this.character, type, this.setTransition)
      }

      this.lockedUntil = dur + +new Date()

      setTimeout(() => {
        if (this.allowToGoOn) {
          cb(dur)
        }
      }, dur)
    }
  }

  constructor(
    obj,
    emitResult = () => {},
    emitLineNumber = () => {},
    emitOnHand = () => {},
    emitAda = () => {}
  ) {
    this.tests = (obj.tests ? obj.tests : []).concat()
    this.winCondition = (obj.winCondition
      ? obj.winCondition
      : this.tests.length > 0
      ? this.tests[0].output
      : []
    ).concat()
    this.inputSection = (obj.inputSection
      ? obj.inputSection
      : this.tests.length > 0
      ? this.tests[0].input
      : []
    ).concat()
    this.middleSection = (obj.middleSection ? obj.middleSection : []).concat()
    this.outputSection = (obj.outputSection ? obj.outputSection : []).concat()
    this.onHand = obj.onHand ? obj.onHand : null
    this.lineNumber = obj.lineNumber ? obj.lineNumber : 0
    this.logs = obj.logs ? obj.logs : ['info', 'error', 'success']
    this.emitLineNumber = emitLineNumber
    this.emitOnHand = emitOnHand
    this.emitResult = emitResult
    this.character = obj.character ? obj.character.$el : null
    this.setTransition = obj.setTransition ? obj.setTransition : () => {}
    this.noWait = obj.noWait ? obj.noWait : false
    this.allowToGoOn = true
    this.emitAda = emitAda

    // normalize
    this.inputSection = this.inputSection.map((e) => '' + e)
    this.outputSection = this.outputSection.map((e) => '' + e)
    this.middleSection = this.middleSection.map((e) => '' + e)
    this.winCondition = this.winCondition.map((e) => '' + e)
  }

  changeLineNumber(newLineNumber) {
    this.lineNumber = newLineNumber
    this.emitLineNumber(newLineNumber)
  }

  setOnHand(box) {
    this.onHand = box
    this.emitOnHand(box)
  }

  printLog = {
    info: (...args) => {
      if (this.logs.includes('info')) console.log(...args)
    },
    success: (...args) => {
      if (this.logs.includes('success')) console.log(...args)
    },
    error: (...args) => {
      this.emitAda(...args)
      if (this.logs.includes('error')) console.error(...args)
    },
  }

  startFromBeginning = (sanitizedArray) => {
    this.nextLine.bind(this)(sanitizedArray)
    this.allowToGoOn = true
  }

  nextLine = function (arr, callback = () => {}, dont) {
    if (!this.jumpBacks) {
      this.jumpBacks = {}
      // Set jumpbacks before launch
      arr.forEach((el, idx) => {
        if (el.split(' ')[0] === 'CME') {
          this.jumpBacks[el.split(' ')[1]] = idx
        }
      })
    }

    this.outputSection = this.outputSection.map((e) => '' + e)

    if (
      JSON.stringify(this.winCondition) === JSON.stringify(this.outputSection)
    ) {
      this.emitResult({
        type: 'bravo',
        exec: this.n,
        lines: 0, // TODO
      })
      return
    }
    if (arr[this.lineNumber] === undefined) {
      this.emitResult({
        type: 'bitti',
      })
      return
    }
    this.n = this.n + 1
    const commandAndValue = arr[this.lineNumber].split(' ')
    const next = function (newLineNumber) {
      if (!isNaN(newLineNumber)) {
        this.changeLineNumber(newLineNumber)
      } else {
        this.changeLineNumber(this.lineNumber + 1)
      }

      // document.getElementById('line').style.top = lineNumber * 18 + 'px'
      // document.getElementById('hand').textContent = onHand
      this.printLog.info(
        'Aşama ' + this.n + ':',
        this.lineNumber,
        this.onHand,
        this.jumpBacks,
        this.inputSection,
        this.middleSection,
        this.outputSection,
        this.winCondition
      )

      callback(commandAndValue)

      if (!dont) {
        this.nextLine.bind(this)(arr)
      }
    }.bind(this)

    const fns = {
      CME(e) {
        // if indicator is on jump ends, do not count it as exec
        this.n = this.n - 1
        next()
      },
      INP: () => {
        this.printLog.info('Kutuyu alıyorum')
        this.runDat('INP', () => {
          this.setOnHand(this.inputSection.shift())
          if (this.onHand === undefined) {
            this.printLog.error('Olmayan bir kutuyu almaya çalışıyorsun sanki?')
          } else {
            next()
          }
        })
      },
      OUT: () => {
        this.printLog.info('Kutuyu Veriyorum')
        this.runDat('OUT', () => {
          if (this.onHand) {
            this.outputSection.push(this.onHand)
            this.setOnHand(null)
            next()
          } else {
            this.printLog.error(
              'Elinde kutu yok, neyi çıktı bandına koymak istiyorsun?'
            )
          }
        })
      },
      CPY: (e) => {
        this.printLog.info('Kopyalıyorum', e)
        this.runDat('CPY' + e, () => {
          Vue.set(this.middleSection, e, this.onHand)
          next()
        })
      },
      SUB: (e) => {
        this.runDat('SUB' + e, () => {
          if (this.onHand !== undefined) {
            if (this.middleSection[e] !== undefined) {
              this.printLog.info('Çıkartıyorum')
              this.setOnHand(
                Number(this.onHand) - Number(this.middleSection[e])
              )
              next()
            } else {
              this.printLog.error(
                'Yerde işlem yapılacak bir kutu yok...',
                'Öncelikle yere bir kutu koyman gerek.'
              )
            }
          } else {
            this.printLog.error('Elinde kutu yok, neyi çıkartmayı istiyorsun?')
          }
        })
      },
      ADD: (e) => {
        this.runDat('ADD' + e, () => {
          if (this.onHand !== null) {
            this.printLog.info('Ekliyorum')
            this.setOnHand(Number(this.onHand) + Number(this.middleSection[e]))
            next()
          } else {
            this.printLog.error('Elinde kutu yok, neyi eklemeyi istiyorsun?')
          }
        })
      },
      JPZ: (e) => {
        this.printLog.info('Sıfır ise atlıyorum:', e)
        this.printLog.info('Elimdeki:', this.onHand, this.onHand === 0)
        if ('' + this.onHand === '0') {
          this.printLog.info('Sıfır gördüm, atladım')
          if (this.maxJump > this.jump) {
            this.jump = this.jump + 1
            fns.JMP(e)
          } else {
            this.printLog.error('Çok fazla atlama yapıyorsun sanki?')
          }
        } else {
          this.printLog.info('SIFIR YOK, ELİMDEKİ', this.onHand)
          next()
        }
      },
      JMP: (e) => {
        if (this.maxJump > this.jump) {
          this.jump = this.jump + 1
          this.printLog.info('Atlıyorum:', e)
          this.printLog.info(this.jumpBacks[e])
          next(this.jumpBacks[e])
        } else {
          this.printLog.error('Çok fazla atlama yapıyorsun sanki?')
        }
      },
      GET: (e) => {
        this.runDat('GET' + e, () => {
          if (this.middleSection[e] !== undefined) {
            this.setOnHand(this.middleSection[e])
            next()
          } else {
            this.printLog.info('error')
          }
        })
      },
    }
    if ((dont && +new Date() > this.lockedUntil) || !dont) {
      if (this.allowToGoOn) {
        fns[commandAndValue[0]](commandAndValue[1])
      }
    }
  }.bind(this)
}
