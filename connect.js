// avoid duplicate code for connecting to mongoose
require("dotenv").config();
const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

const mongoose = require("mongoose");
const neo4j = require("./neo");

// these options are to not let mongoose use deprecated features of the mongo driver
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function mongo(dbName) {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/${dbName}`, options);
    console.log(`connection to mongo DB ${dbName} established`);
  } catch (err) {
    console.error(err);
  }
}

async function neo(dbName) {
  try {
    neo4j.connect(dbName);
    console.log(`connection to neo4J DB ${dbName} established`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { mongo, neo };
