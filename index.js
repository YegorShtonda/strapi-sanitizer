const sanitizeString = (data, model) => {
  let newData = data
  const props = model.split('.')
  for (let i = 0; i < props.length; i++) {
    if (newData[props[i]]) {
      newData = newData[props[i]]
    } else {
      newData = null
      break
    }
  }
  return newData
}
const sanitizeArray = (data, model) => {
  let newData = []
  if (data && data.length) {
    data.forEach((item) => {
      newData.push(sanitizeObject(item, model[0]))
    })
  }
  return newData
}
const sanitizeObject = (data, model) => {
  const newData = {}
  if (data) {
    for(const prop in model) {
      if (typeof model[prop] === 'function') {
        newData[prop] = model[prop](data[prop])
      } else if (model[prop] === true) {
        newData[prop] = data[prop]
      } else if (typeof model[prop] === 'string') {
        newData[prop] = sanitizeString(data, model[prop])
      } else if (Array.isArray(model[prop])) {
        if (data[prop]) {
          newData[prop] = sanitizeArray(data[prop], model[prop])
        } else {
          newData[prop] = []
        }
      } else if (typeof model[prop] === 'object') {
        if (data[prop]) {
          newData[prop] = sanitizeObject(data[prop], model[prop])
        } else {
          newData[prop] = null
        }
      }
    }
  }
  return newData
}

const main = (data, model) => {
  if (!data || !model) return data
  let Model = model
  if (typeof model === 'string') {
    Model = require(`../../sanitizer/${model}`)
  }
  if (Array.isArray(data)) {
    return sanitizeArray(data, Model)
  } else if (typeof data === 'object') {
      return sanitizeObject(data, Model)
  } else {
    return data
  }
}

module.exports = main
