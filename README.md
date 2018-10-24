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

# Sudoku generator/solver service

GET https://sugoku2.herokuapp.com/board?difficulty=easy|medium|hard

POST https://sugoku2.herokuapp.com/solve
{ "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
board=%5B%5B0%2C0%2C0%2C2%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C3%2C0%2C0%2C0%2C0%2C7%2C0%5D%2C%5B0%2C0%2C0%2C1%2C0%2C9%2C0%2C0%2C0%5D%2C%5B0%2C1%2C0%2C0%2C7%2C0%2C0%2C0%2C0%5D%2C%5B0%2C0%2C0%2C0%2C0%2C0%2C4%2C0%2C0%5D%2C%5B0%2C0%2C7%2C0%2C0%2C0%2C0%2C0%2C0%5D%2C%5B0%2C3%2C1%2C0%2C0%2C0%2C0%2C9%2C6%5D%2C%5B0%2C0%2C0%2C0%2C9%2C3%2C7%2C4%2C1%5D%2C%5B0%2C4%2C5%2C7%2C1%2C0%2C3%2C8%2C0%5D%5D

# TO-DO's

- [] e2e tests
- [] more robust error handling
- [] investigate: improve response time < 500ms
