// reads the .env file and stores it as environment variables, use for config
require("dotenv").config();

const connect = require("./connect");

const app = require("./src/app");

// start the app
const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

// connect to the database
connect.mongo(process.env.MONGO_DB_NAME);
connect.neo();

module.exports = app;
