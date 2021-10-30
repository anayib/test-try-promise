// require('express-async-errors')
// compare this successful error handling to serverFail.js

const PORT = process.env.PORT || 3000;
const express = require('express')

const app = express()
app.use(express.json());

function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Error from Foo Promise'))
    }, 2000);
  })
}

function errorHandler(req, res, next) {
  res.status(err.status ||500)
    .json({ error: 'ERROR FROM errorHandler'})
}

app.get('/', async function (req, res, next)  {
  try {
    const result = await foo()
    res.status(200).json({result});
  } catch (error) {
    //throw new Error('asdfasdfa');
    res.status(404).json({ error:  error.message });
  }

  // foo().then(() => res.send('then')).catch((err) => {res.send('sdfsd')})
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
