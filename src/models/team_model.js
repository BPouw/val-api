const mongoose = require("mongoose")
const Schema = mongoose.Schema

const getModel = require('./model_cache')
const TeamSchema = new Schema({
    teamname: {
        type: String,
        required: [true, 'A team must have a name']
    },
    country: {
        type: String,
        required: [true, 'A team must play under a flag']
    },
    ranking: {
        type: Number,
        required: [true, 'A team must have a ranking']
    },
    logo: {
        type: String,
        required: [true, 'A team must have a logo']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: {maxDepth: 1}
    }
})

TeamSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('teams', TeamSchema)