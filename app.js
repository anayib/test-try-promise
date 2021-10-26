const express = require('express');
//const createError = require("http-errors");

const app = express();
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, 1000);
    });
  } catch(err){
    throw new Error("Error from / route");
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err.message});
})

module.exports = app;
