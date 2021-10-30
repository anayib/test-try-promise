const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const asynchronousCode = (res) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const customError = new Error("Error from rejected promise")
      customError.status = 403;
      reject(customError);
    }, 1000);
  })
};

app.get("/", async (req, res, next) => {
  try {
    const result = await asynchronousCode();
    res.status(200).json({ result: "Promise resolved" });
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res) => {
  res.status( err.status || 500).json({error: err.message, statusCode: err.status});
})


app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
