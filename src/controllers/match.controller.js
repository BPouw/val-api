class MatchController {
    constructor(model)
    {
        this.model = model
    }

    getMatches = async (req, res, next) => {
        const entities = await this.model.find({
            $or: [{
                team1: req.params.id
            },
            {
                team2: req.params.id
            }
        ]
        })
        res.status(200).send(entities)
    }

    getUserMatches = async (req, res, next) => {
        const entities = await this.model.find({author: req.params.id})
        res.status(200).send(entities)
    }

}

module.exports = MatchController

