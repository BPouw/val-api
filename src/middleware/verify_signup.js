const user = require("../models/user_model")

exports.checkDuplicateUsername = (req, res, next) => {
    user.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err})
            return
        }

        if (user) {
            res.status(400).send({ message: "Username has already been taken"})
            return
        }

        next();
    })
}