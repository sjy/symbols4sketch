module.exports = (argList => {
  const arg = {}
  let opt, thisOpt, curOpt
  for (let i = 0; i < argList.length; i++) {
    thisOpt = argList[i].trim()
    opt = thisOpt.replace(/^\-+/, '')

    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt
      curOpt = null
    } else {
      // argument name
      curOpt = opt
      arg[curOpt] = true
    }
    // console.log({ opt, thisOpt, curOpt })
  }

  return arg

})
