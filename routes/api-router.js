
const express = require('express')
const { getApiEndpoints } = require('../controllers/api-controllers.js')

const apiRouter = express.Router()

const catergoriesRouter = require('./categories-router.js')
const commentsRouter = require('./comments-router.js')
const reviewsRouter = require('./reviews-router.js')
const usersRouter = require('./users-router.js')

apiRouter.route('/').get(getApiEndpoints)

apiRouter.use('/categories', catergoriesRouter)
apiRouter.use('/reviews', reviewsRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)

module.exports = apiRouter