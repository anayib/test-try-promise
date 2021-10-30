const express = require('express');
//const createError = require("http-errors");
// compare this failed error handling with the serverSuccessfulErrorHanlder.js serever
const app = express();
app.use(express.json());

app.get('/', async function (req, res, next) {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Error from Promise"));
      }, 1000);
    });
    // this fails because Im not handling any successful response here like res.status(200).json(...)
  } catch(err){
    next(err)
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err.message});
})

module.exports = app;
