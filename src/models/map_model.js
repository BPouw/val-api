const mongoose = require("mongoose")
const Schema = mongoose.Schema

const getModel = require('./model_cache')
const MapSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A map must have a name']
    },
    thumbnail: {
        type: String,
        required: [true, 'A map must have a thumbnail']
    },
    is_active: {
        type: Boolean,
        required: [true, 'A map must be (in)active'],
    },
    description: {
        type: String,
        required: [true, 'A map must have description']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        autopopulate: {maxDepth: 1}
    }
})

MapSchema.plugin(require("mongoose-autopopulate"));

module.exports = getModel('maps', MapSchema)