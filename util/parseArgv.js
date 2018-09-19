module.exports = (argList => {
  const arg = {}
  let curOpt = null
  for (let i = 0; i < argList.length; i++) {
    const thisOpt = argList[i].trim()
    const opt = thisOpt.replace(/^-+/, '')

    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt
      curOpt = null
    } else {
      // argument name
      curOpt = opt
      arg[curOpt] = true
    }
  }

  return arg
})
