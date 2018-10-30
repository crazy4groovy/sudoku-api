# How to run/test

- setup: `npm install`
- test `npm test`
- run: `npm start`

Note: `.env` file contains some env vars for service at runtime

# Tech stack

- fastify (instead of Express)
- xo (for eslint + prettify)
- jest (instead of mocha/sinon)
- dotenv (for env variables)

# Routes

- GET `/sudoku/board` >> return a valid/solved sudoku board (array, length of 81)
  - eg. [3,7,1,6,5,2,9,4,8,6,5,2,9,4,8,3,7,1,9,4,8,3,7,1,6,5,2,7,1,6,5,2,9,4,8,3,5,2,9,4,8,3,7,1,6,4,8,3,7,1,6,5,2,9,1,6,5,2,9,4,8,3,7,2,9,4,8,3,7,1,6,5,8,3,7,1,6,5,2,9,4]

- GET `/sudoku/board?idx=0&num=1` >> return a valid/solved sudoku board, with the `num` at `idx` as specified
  - eg. `idx=0&num=9` [9,8,5,1,4,6,7,2,3,1,4,6,7,2,3,9,8,5,7,2,3,9,8,5,1,4,6,8,5,1,4,6,7,2,3,9,4,6,7,2,3,9,8,5,1,2,3,9,8,5,1,4,6,7,5,1,4,6,7,2,3,9,8,6,7,2,3,9,8,5,1,4,3,9,8,5,1,4,6,7,2]

# REMOVED: Sudoku generator/solver service

GET https://sugoku2.herokuapp.com/board?difficulty=easy|medium|hard

POST https://sugoku2.herokuapp.com/solve
{ "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
board=%5B%5B0%2C0%2C0%2C2%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C3%2C0%2C0%2C0%2C0%2C7%2C0%5D%2C%5B0%2C0%2C0%2C1%2C0%2C9%2C0%2C0%2C0%5D%2C%5B0%2C1%2C0%2C0%2C7%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C4%2C0%2C0%5D%2C%5B0%2C0%2C7%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C3%2C1%2C0%2C0%2C0%2C0%2C9%2C6%5D%2C%5B0%2C0%2C0%2C0%2C9%2C3%2C7%2C4%2C1%5D%2C%5B0%2C4%2C5%2C7%2C1%2C0%2C3%2C8%2C0%5D%5D

# TO-DO's

- [] e2e tests
- [] more robust service error response/handling

# Hosted

https://crazy4groovy-sudoku-api.glitch.me/sudoku/board
