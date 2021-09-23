const express = require('express')
const { getCommentsbyReviewID } = require('../controllers/comments-controllers')
const { getReviewByID, patchReview, getAllReviews } = require('../controllers/reviews-controllers')
const commentsRouter = require('./comments-router')

const reviewsRouter = express.Router()

reviewsRouter.route('/').get(getAllReviews)

reviewsRouter.route('/:review_id').get(getReviewByID).patch(patchReview)

reviewsRouter.route('/:review_id/comments').get(getCommentsbyReviewID)

module.exports = reviewsRouter