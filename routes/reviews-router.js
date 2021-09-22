const express = require('express')
const { getReviewByID } = require('../controllers/reviews-controllers')

const reviewsRouter = express.Router()

reviewsRouter.route('/:review_id').get(getReviewByID)

module.exports = reviewsRouter