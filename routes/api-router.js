
const express = require('express')

const apiRouter = express.Router()

const catergoriesRouter = require('./categories-router.js')
const reviewsRouter = require('./reviews-router.js')


apiRouter.use('/categories', catergoriesRouter)
apiRouter.use('/reviews', reviewsRouter)

module.exports = apiRouter