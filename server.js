// require('express-async-errors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

function foo() {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej()
    }, 1000);
  })
}

function errorHandler(req, res) {
  res.status(420)
     .send('errorHandler')
}

app.get('/', async (req, res) => {
  try {
    await foo()
    res.send('try')
  } catch (error) {
    throw new Error('asdfasdfa')
  }

  // foo().then(() => res.send('then')).catch((err) => {res.send('sdfsd')})
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
