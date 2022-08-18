const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const PlayerSchema = new Schema({
    gamertag: {
        type: String,
        required: [true, 'a player must have a gamertag']
    },
    fullname: {
        type: String,
        required: [true, 'a player must have a real name']
    },
    picture: String,
    earnings: Number,
    country: String,
    team: {
        type: Schema.Types.ObjectId,
        ref: "teams",
        autopopulate: false
    },
    agents: [{
        type: String
    }]


})

PlayerSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('players', PlayerSchema)
