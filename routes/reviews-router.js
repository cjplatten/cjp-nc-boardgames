const express = require('express')
const { getReviewByID, patchReview } = require('../controllers/reviews-controllers')

const reviewsRouter = express.Router()

reviewsRouter.route('/:review_id').get(getReviewByID).patch(patchReview)

module.exports = reviewsRouter