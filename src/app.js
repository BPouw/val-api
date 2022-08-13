const express = require("express");
const bodyParser = require("body-parser");

// this catches an exception in a route handler and calls next with it,
// so express' error middleware can deal with it
// saves us a try catch in each route handler
// note: this will be standard in express 5.0, to be released soon
require("express-async-errors");

const app = express();

const helmet = require("helmet");

const morgan = require("morgan");

// parse json body of incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// enable CORS (cross origin resourse sharing)
// you don't need it for this example, but you will if you host a frontend
// on a different origin (url)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// Add CORS headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'x-access-token, X-Requested-With,content-type,authorization'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

// not the topic of this example, but good to be aware of security issues
// helmet sets headers to avoid common security risks
// https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());

// use morgan for logging
app.use(morgan("dev"));

const playerRoutes = require("./routes/player_routes")
const teamRoutes = require("./routes/team_routes")
const matchRoutes = require("./routes/match_routes")
const tournamentRoutes = require("./routes/tournament_routes")

app.use('/api', playerRoutes)
app.use('/api', teamRoutes)
// app.use("/api", matchRoutes)
app.use("/api", tournamentRoutes)

const errors = require('./errors')

// catch all not found response
app.use("*", function (_, res) {
  res.status(404).json({
    message: "something really unexpected happened",
  });
});

// error responses
app.use("*", function (err, req, res, next) {
  console.error(`${err.name}: ${err.message}`);
  // console.error(err)
  next(err);
});

app.use('*', errors.handlers)

//unexpected
app.use("*", function (err, req, res, next) {
  res.status(500).json({
    message: "something really unexpected happened",
  });
});

// export the app object for use elsewhere
module.exports = app;