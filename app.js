const express = require('express');
const createError = require("http-errors");

const app = express();
app.use(express.json());

app.get('/', async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject( createError(403));
      }, 1000);
    });
  } catch(err){
    next(err);
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err.message});
})

module.exports = app;
