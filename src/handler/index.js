const fetch = require('node-fetch')
const flatten = require('lodash.flatten')

const {chunkify} = require('./utils')

module.exports.get = async ({query}) => {
  const {difficulty = 'easy'} = query
  const {board} = await fetch(
    `https://sugoku2.herokuapp.com/board?difficulty=${difficulty}`
  ).then(response => response.json())
  return flatten(board)
}

module.exports.post = async ({body}) => {
  const chunkedBody = chunkify(body)
  const board = encodeURIComponent(JSON.stringify(chunkedBody))
  const {solution} = await fetch('https://sugoku2.herokuapp.com/solve', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `board=${board}`
  }).then(response => response.json())
  return flatten(solution)
}
