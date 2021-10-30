// server with async/await try/catch wrapper to avoid writting try/cath in every middleware
const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// wrapper to avoid try/catch repetition. This's a high order function as it receives a function as param and returns another function.
const asyncWrapper = (fn) => {
  return async(req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

const asynchronousPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const customError = new Error("Error from Promise");
      customError.status = 404;
      reject(customError)
    }, 1000)
  })
}

app.get(`/`, asyncWrapper(async (req, res, next) => {
  const result = await asynchronousPromise(); // this promise returns a rejection and the error is handled by the error handler middleware.
  res.status(200).json({result: `Resolved from Promise`}); // this resposne should never happen
}));

app.use((err, req, res, next) => {
  res.status(err.status || 500)
    .send(err.message);
});

app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
