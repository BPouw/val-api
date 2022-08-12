const mongoose = require("mongoose")
const Schema = mongoose.Schema

const getModel = require('./model_cache')
const TournamentSchema = new Schema({
    name: {
        type: string,
        required: [true, 'A tournament must have a name']
    },
    startdate: {
        type: Date,
        required: [true, 'A tournament must have a date']
    },
    enddate: {
        type: Date,
        required: [true, 'A tournament must have a date']
    },
    // logo: string,
    prize: string,
    region: {
        type: string,
        required: [true, 'A tournament must be in a region']
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: 'teams',
        autopopulate: true
    }],
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'matches',
        autopopulate: true
    }]

    
})

TournamentSchema.plugin(require("mongoose-autopopulate"))

module.exports = getModel('tournaments', TournamentSchema)