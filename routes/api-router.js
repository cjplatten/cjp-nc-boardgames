
const express = require('express')

const apiRouter = express.Router()

const catergoriesRouter = require('./categories-router.js')


apiRouter.use('/categories', catergoriesRouter)

module.exports = apiRouter