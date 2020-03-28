export const applyDrag = (arr, dragResult, uniq) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd =
    removedIndex === null && addedIndex !== null
      ? { ...payload, id: 'c' + uniq }
      : payload

  let changed = 0

  // Something removed
  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
    console.log('something removed', itemToAdd)
    changed = 1
  }

  // Something added
  if (addedIndex !== null) {
    if (changed === 1) {
      changed = 2
    }
    result.splice(addedIndex, 0, itemToAdd)
    // if added command is return, add return point
    if (itemToAdd.return && removedIndex === null) {
      // TODO maybe store it in a global variable?
      let returnLength = 0
      for (let i = 0; i < result.length; i++) {
        if (result[i].return && !result[i].notALine) {
          returnLength++
        }
      }

      itemToAdd.value = returnLength

      result.splice(addedIndex + 1, 0, {
        ...itemToAdd,
        id: 'cr' + uniq,
        text: '',
        style: 'height:56px;width:56px;' + itemToAdd.style,
        notALine: true,
        value: returnLength
      })
    }
  }

  // yer değiştirdi
  if (changed === 2) {
  }
  // silindi
  else if (changed === 1) {
    if (itemToAdd.return) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].return && result[i].value === itemToAdd.value) {
          result.splice(i, 1)
        }
      }
    }
  }
  // eklendi
  else if (changed === 0) {
  }

  let lineNumber = 1
  for (let i = 0; i < result.length; i++) {
    if (!result[i].notALine) {
      result[i].lineNumber = lineNumber
      lineNumber++
    }
  }

  result.map((el) => {
    return el.addedIndex
  })

  return result
}

export const generateItems = (count, creator) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(creator(i))
  }
  return result
}
