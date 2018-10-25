const fetch = require('node-fetch')
const flatten = require('lodash.flatten')

const {chunkify} = require('./utils')

async function get({query}) {
  const {difficulty = 'easy'} = query

  const {board} = await fetch(
    `https://sugoku2.herokuapp.com/board?difficulty=${difficulty}`
  ).then(response => response.json())

  if (query.solve !== 'false') {
    return post({body: board})
  }

  return flatten(board)
}

async function post({body}) {
  const bodyChunked = chunkify(body)
  const board = encodeURIComponent(JSON.stringify(bodyChunked))

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

module.exports.get = get
module.exports.post = post
