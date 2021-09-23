const express = require('express')
const { getCommentsbyReviewID, postCommentToReview } = require('../controllers/comments-controllers')
const { getReviewByID, patchReview, getAllReviews } = require('../controllers/reviews-controllers')


const reviewsRouter = express.Router()

reviewsRouter.route('/').get(getAllReviews)

reviewsRouter.route('/:review_id').get(getReviewByID).patch(patchReview)

reviewsRouter.route('/:review_id/comments').get(getCommentsbyReviewID).post(postCommentToReview)

module.exports = reviewsRouter