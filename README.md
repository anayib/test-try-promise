# Examples of handling Errors with asynchronous code

This repo includes several examples of how to handle and how not to handle asynchronous code error with express using promises async/await syntax, and also includes the wrapper approach to avoid repeating yourself wrtting try/catch statements in every middleware - file `serverAsyncWrapper.js` - .


## Questions

1. Why throwing an error from the catch part of the try/catch block make express brake the node process ?

2. Would try/catch catch an error thrown from asynchronous code (a rejected promise)? (validate with `server6.js`) consuming the bike-brand and bike-color services.

## To remember

To correctly handle asynchronous code with express you need:

1. Use Promises [handling errors with promises](https://expressjs.com/en/advanced/best-practice-performance.html#use-promises);

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

2. Use a wrapper for `async/await` code. This wrapper catches rejected promises and call `next()`. [async/await wrapper](https://expressjs.com/en/            advanced/best-practice-performance.html#use-promises)

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```
Also check the file `serverAsyncWrapper.js`

3. You need to pass the error via next(next) if the catch part of the try/catch or send it straight in the response. Eg:

```js
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
```
