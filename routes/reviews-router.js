const express = require('express')
const { getReviewByID, patchReview, getAllReviews } = require('../controllers/reviews-controllers')

const reviewsRouter = express.Router()

reviewsRouter.route('/').get(getAllReviews)

reviewsRouter.route('/:review_id').get(getReviewByID).patch(patchReview)

module.exports = reviewsRouter