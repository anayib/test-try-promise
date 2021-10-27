const express = require('express');
const PORT = process.env.PORT  || 3000;

const app = express();
app.use(express.json());


app.get('/', async function (req, res, next) {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Error from Promise"));
      }, 2000);
    });

    res.status(200).json(result);
  } catch(err){
    res.status(404).json({error: err.message});
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({error: err.message});
})

app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`));
