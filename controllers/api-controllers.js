const { readApiEndpoints } = require("../models/api-models")


exports.getApiEndpoints = async (req, res, next) => {
    try {
        const endpoints = await readApiEndpoints()
        return res.status(200).send({endpoints});
    } catch (err) {
        next(err)
    }
}