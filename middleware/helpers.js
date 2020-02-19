export const applyDrag = (arr, dragResult, uniq) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd =
    removedIndex === null && addedIndex !== null
      ? { ...payload, id: 'c' + uniq }
      : payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
    if (itemToAdd.return && removedIndex === null) {
      result.splice(addedIndex + 1, 0, {
        ...itemToAdd,
        id: 'cr' + uniq,
        text: '',
        style: 'height:56px;width:56px;background:#FFD95C',
        notALine: true
      })
    }
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
