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

let n = 0

export const nextLine = function (arr, callback = () => {}, dont) {
  if (arr[this.lineNumber] === undefined) {
    console.log('bitti')
    return
  }
  if (
    JSON.stringify(this.winCondition) === JSON.stringify(this.outputSection) &&
    this.inputSection.length === 0
  ) {
    // send backend the code
    console.log('bravo')
    return
  }
  n++
  const commandAndValue = arr[this.lineNumber].split(' ')
  const next = function (newLineNumber) {
    if (!isNaN(newLineNumber)) {
      this.lineNumber = newLineNumber
    } else {
      this.lineNumber = this.lineNumber + 1
    }

    // document.getElementById('line').style.top = lineNumber * 18 + 'px'
    // document.getElementById('hand').textContent = onHand
    console.log(
      'Aşama ' + n + ':',
      this.lineNumber,
      this.onHand,
      this.jumpBacks,
      this.inputSection,
      this.middleSection,
      this.outputSection
    )

    callback(commandAndValue)

    if (!dont) {
      nextLine.bind(this)(arr)
    }
  }.bind(this)
  const fns = {
    CME(e) {
      // if indicator is on jump ends, do not count it as exec
      n--
      next()
    },
    INP: () => {
      console.log('Kutuyu alıyorum')
      this.onHand = this.inputSection.shift()
      if (!this.onHand) {
        this.error('Alacak hiçbir kutu yok ve problem çözülemedi')
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
      Vue.set(this.middleSection, e, this.onHand)
      next()
    },
    SUB: (e) => {
      if (this.onHand !== undefined) {
        if (this.middleSection[e] !== undefined) {
          console.log('Çıkartıyorum')
          this.onHand -= this.middleSection[e]
          next()
        } else {
          this.error('Çıkartılacak kutu bulunamadı.')
        }
      } else {
        this.error('Ellerim bomboş')
      }
    },
    ADD: (e) => {
      if (this.onHand !== null) {
        console.log('Ekliyorum')
        this.onHand += this.middleSection[e]
        next()
      } else {
        this.error('Ellerim bomboş')
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
    },
  }
  fns[commandAndValue[0]](commandAndValue[1])
}
