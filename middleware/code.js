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
}

export const calculateHypo = (o1, o2) => {
  return Math.sqrt((o1.left - o2.left) ** 2 + (o1.top - o2.top) ** 2)
}

export const calculateTime = (distance) => {
  return Math.floor(distance * 1.4)
}

export const go = (character, type, setTransition) => {
  if (character) {
    const time = calculateTime(
      calculateHypo(
        {
          left: character.offsetLeft,
          top: character.offsetTop,
        },
        positions[type]
      )
    )
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

  runDat = (type, cb) => {
    if (this.noWait) {
      cb()
    } else {
      const dur = go(this.character, type, this.setTransition)
      this.lockedUntil = dur + +new Date()

      setTimeout(() => {
        cb(dur)
      }, dur)
    }
  }

  constructor(
    obj,
    emitResult = () => {},
    emitLineNumber = () => {},
    emitOnHand = () => {}
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
      if (this.logs.includes('error')) console.error(...args)
    },
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

    if (
      JSON.stringify(this.winCondition) ===
        JSON.stringify(this.outputSection) &&
      this.inputSection.length === 0
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
          if (!this.onHand) {
            this.printLog.error('Alacak hiçbir kutu yok ve problem çözülemedi')
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
            this.printLog.error('Ellerim bomboş')
          }
        })
      },
      CPY: (e) => {
        this.printLog.info('Kopyalıyorum')
        Vue.set(this.middleSection, e, this.onHand)
        next()
      },
      SUB: (e) => {
        if (this.onHand !== undefined) {
          if (this.middleSection[e] !== undefined) {
            this.printLog.info('Çıkartıyorum')
            this.setOnHand(this.onHand - this.middleSection[e])
            next()
          } else {
            this.printLog.error('Çıkartılacak kutu bulunamadı.')
          }
        } else {
          this.printLog.error('Ellerim bomboş')
        }
      },
      ADD: (e) => {
        if (this.onHand !== null) {
          this.printLog.info('Ekliyorum')
          this.setOnHand(this.onHand + this.middleSection[e])
          next()
        } else {
          this.printLog.error('Ellerim bomboş')
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
        this.printLog.info('Atlıyorum:', e)
        this.printLog.info(this.jumpBacks[e])
        next(this.jumpBacks[e])
      },
      GET: (e) => {
        if (this.middleSection[e] !== undefined) {
          this.setOnHand(this.middleSection[e])
          next()
        } else {
          this.printLog.info('error')
        }
      },
    }
    if ((dont && +new Date() > this.lockedUntil) || !dont) {
      fns[commandAndValue[0]](commandAndValue[1])
    }
  }.bind(this)
}
