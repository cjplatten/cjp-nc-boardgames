const express = require('express');
const { getCommentsbyReviewID } = require('../controllers/comments-controllers');

const commentsRouter = express.Router()

commentsRouter.route('/')

module.exports = commentsRouter;