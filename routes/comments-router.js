const express = require('express');
const { getCommentsbyReviewID, deleteCommentByID } = require('../controllers/comments-controllers');

const commentsRouter = express.Router()

commentsRouter.route('/:comment_id').delete(deleteCommentByID)

module.exports = commentsRouter;