const express = require('express')
const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json());

function foo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Rejection from promise foo function'))
    }, 2000);
  })
};

function errorHandler(req, res, next) {
  res.status( err.status || 500 )
     .json({
       error:'handled by errorHandler NOT from the try catch'
     });
}

app.get('/', async  (req, res, next) => {
  try {
    const result = await foo();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));