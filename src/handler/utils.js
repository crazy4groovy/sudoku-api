module.exports.chunkify = (arr, length = 9) =>
  arr.reduce((coll, item, i) => {
    if (i % length === 0) {
      coll.push([])
    }
    coll[coll.length - 1].push(item)
    return coll
  }, [])
