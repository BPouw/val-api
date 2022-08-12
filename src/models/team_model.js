const mongoose = require("mongoose")
const Schema = mongoose.Schema

const getModel = require('./model_cache')
const TeamSchema = new Schema({
    teamname: {
        type: string,
        required: [true, 'A team must have a name']
    },
    country: {
        type: string,
        required: [true, 'A team must play under a flag']
    },
    ranking: {
        type: number,
        required: [true, 'A team must have a ranking']
    },
    // logo: {
    //     type: string,
    //     required: [true, 'A team must have a logo']
    // },
    players: [{
        type: Schema.Types.ObjectId,
        ref: "players",
        autopopulate: true
    }],
    matches: [{
        type: Schema.Types.ObjectId,
        ref: "matches",
        autopopulate: true
    }],
    tournaments: [{
        type: Schema.Types.ObjectId,
        ref: "tournaments",
        autopopulate: true
    }],
})

TeamSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('teams', TeamSchema)