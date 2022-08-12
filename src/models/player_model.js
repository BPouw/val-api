const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getModel = require('./model_cache')

const PlayerSchema = new Schema({
    gamertag: {
        type: string,
        required: [true, 'a player must have a gamertag']
    },
    fullname: {
        type: string,
        required: [true, 'a player must have a real name']
    },
    // picture: {

    // },
    rating: number,
    country: string,
    team: {
        type: Schema.Types.ObjectId,
        ref: "team",
        autopopulate: true
    },
    agents: [{
        name: string
    }]


})

MeetingSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('players', PlayerSchema)