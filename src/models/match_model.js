const mongoose = require("mongoose")
const Schema = mongoose.Schema

const getModel = require('./model_cache')
const MatchSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A match must have a name']
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'teams',
        autopopulate: true
    },
    date: {
        type: Date,
        required: [true, 'A match must have a date']
    },
    map: {
        type: String,
        required: [true, 'A match must be played on a map']
    },
    team1: {
        type: Schema.Types.ObjectId,
        ref: 'teams',
        autopopulate: true
    },
    team2: {
        type: Schema.Types.ObjectId,
        ref: 'teams',
        autopopulate: true
    },
    resultteam1: {
        type: Number
    },
    resultteam2: {
        type: Number
    }

})

MatchSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('matches', MatchSchema)