const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'A user must have a username']
    },
    password: {
        type: String,
        required: [true, 'A user must have a password']
    },
    role: {
        type: String,
        enum : ['user', 'admin'],
        default: 'user'
    } 
})

module.exports = mongoose.model('User', UserSchema)