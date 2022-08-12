const mongoose = require("mongoose")
const Schema = mongoose.Schema

const getModel = require('./model_cache')
const MatchSchema = new Schema({
    name: {
        type: string,
        required: [true, 'A match must have a name']
    },
    result: {
        type: string
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
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'teams',
        autopopulate: true
    }]

})

MatchSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('matches', MatchSchema)