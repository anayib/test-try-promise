const express = require('express');
const PORT = process.env.PORT  || 3000;

const app = express();
app.use(express.json());

/*
if async arrow function is used the error will not be handled. Chain of responsability, you can not use arrow functions.

This fails
app.get('/', async (req, res, next) => { ... });
*/

app.get('/', async function (req, res, next) {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout( () => {
        reject(new Error("Error from Promise"));
      }, 1000);
    });
    res.status(200).json({result: "All right from try"});
  } catch(err){
    // status(err) -> res.status(err).json({error: err.message});
    // this works res.status(404).json({error: err.message})
    next(err) // this works
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err.message});
})

app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
