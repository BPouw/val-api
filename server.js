// reads the .env file and stores it as environment variables, use for config
require('dotenv').config()

const connect = require('./connect')

const app = require('./src/app')

// the order of starting the app and connecting to the database does not matter
// since mongoose buffers queries till there is a connection
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })

// start the app
const port = process.env.PORT || 80
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})



// connect to the databases
 connect.mongo(process.env.MONGO_DB_NAME)
// connect.neo(process.env.NEO4J_PROD_DB)
