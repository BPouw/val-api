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

const cookieSession = require("cookie-session");

// parse json body of incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// enable CORS (cross origin resourse sharing)
// you don't need it for this example, but you will if you host a frontend
// on a different origin (url)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// Add CORS headers mm
app.use(function (req, res, next) {
  const corsWhitelist = [
    "http://localhost:4200",
    "https://val-webapp.vercel.app",
  ];

  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-access-token, X-Requested-With,content-type,authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// not the topic of this example, but good to be aware of security issues
// helmet sets headers to avoid common security risks
// https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());

// use morgan for logging
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cookieSession({
    name: "val-session",
    secret: process.env.SERVER_SECRET,
    httpOnly: true,
  })
);

const playerRoutes = require("./routes/player_routes");
const teamRoutes = require("./routes/team_routes");
const matchRoutes = require("./routes/match_routes");
const authRoutes = require("./routes/auth_routes");
const mapRoutes = require("./routes/map_routes");
const userRoutes = require("./routes/user_routes");

app.use("/api", playerRoutes);
app.use("/api", teamRoutes);
app.use("/api", matchRoutes);
app.use("/api", authRoutes);
app.use("/api", mapRoutes);
app.use("/api", userRoutes);

const errors = require("./errors");

// catch all not found response
app.use("*", function (_, res) {
  res.status(404).json({
    message: "could not find resource",
  });
});

// error responses
app.use("*", function (err, req, res, next) {
  console.error(`${err.name}: ${err.message}`);
  // console.error(err)
  next(err);
});

app.use("*", errors.handlers);

//unexpected
app.use("*", function (err, req, res, next) {
  res.status(500).json({
    message: "application error",
  });
});

// export the app object for use elsewhere
module.exports = app;
