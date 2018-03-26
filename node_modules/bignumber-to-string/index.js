// setup main method
function bigNumberToString (obj, base) {
  // setup base
  base = base || 10

  // check if obj is type object, not an array and does not have BN properties
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj) && !('lessThan' in obj)) {
    // move through plain object
    Object.keys(obj).forEach(function (key) {
      // recurively converty item
      obj[key] = bigNumberToString(obj[key], base)
    })
  }

  // obj is an array
  if (Array.isArray(obj)) {
    // convert items in array
    obj = obj.map(function (item) {
      // convert item to a string if bignumber
      return bigNumberToString(item, base)
    })
  }

  // if not an object bypass
  if (typeof obj !== 'object' || obj === null) return obj

  // if the object to does not have BigNumber properties, bypass
  if (!('toString' in obj) || !('lessThan' in obj)) return obj

  // if object has bignumber properties, convert to string with base
  return obj.toString(base)
}

// export bigNumberToString module
module.exports = bigNumberToString
