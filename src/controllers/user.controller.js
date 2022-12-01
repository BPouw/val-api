const User = require("../models/user_model")

exports.getOne = async (req, res) => {
    const entity = await User.findById(req.params.id)
    res.status(200).send(entity)
}

