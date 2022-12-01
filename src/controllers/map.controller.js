class MapController {
    constructor(model)
    {
        this.model = model
    }

    getUserMaps = async (req, res, next) => {
        const entities = await this.model.find({author: req.params.id})
        res.status(200).send(entities)
    }

}

module.exports = MapController

