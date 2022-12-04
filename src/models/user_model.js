const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  country: {
    type: String,
    required: [true, "A user must have a country"],
  },
});

UserSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("User", UserSchema);
