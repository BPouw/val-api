class PlayerController {
    constructor(model)
    {
        this.model = model
    }

    getPlayers = async (req, res, next) => {
        const entities = await this.model.find({team: req.params.id})
        res.status(200).send(entities)
    }

    getUserPlayers = async (req, res, next) => {
        const entities = await this.model.find({author: req.params.id})
        res.status(200).send(entities)
    }
}

module.exports = PlayerController

