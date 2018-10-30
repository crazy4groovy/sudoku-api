const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const cors = require('cors')()
// const { parse, stringify } = require('flatted/cjs');

const myEnv = dotenv.config()
dotenvExpand(myEnv)

const fastify = require('fastify')({
  logger: process.env.LOGGING || false
})

const handler = require('./handler')

fastify.use(cors)

fastify.get('/', async () => {
  return {
    GET: '/sudoku/board{?idx=(0-80)&number=(1-9)}'
    // GET: '/sudoku/board?difficulty=(easy|medium|hard)&solve=(true|false)',
    // POST: '/sudoku/board >> application/json body of "[1,2,3...]"'
  }
})

fastify.get('/sudoku/board', async (req, res) => {
  const {query} = req
  res.type('application/json').code(200)
  return handler.get({query})
})

// const postOpts = Object.freeze({
//   schema: {
//     body: {
//       type: 'array'
//     }
//   }
// })

// fastify.post('/sudoku/board', postOpts, async (req, res) => {
//   const {body} = req
//   res.type('application/json').code(200)
//   return handler.post({body})
// })

fastify.listen(
  Number(process.env.PORT) || 3000,
  process.env.IP || '0.0.0.0',
  (err, address) => {
    if (err) {
      console.log(`STARTUP ERROR: ${err}`)
      throw err
    }
    // fastify.log.info(`Server listening on ${address}`)
    console.log(`Server listening on ${address}`)
  }
)
