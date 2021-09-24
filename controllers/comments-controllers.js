const {
  fetchCommentsbyReviewID,
  addCommentToReview,
  removeCommentByID,
} = require("../models/comments-models");

exports.getCommentsbyReviewID = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const comments = await fetchCommentsbyReviewID(review_id);
    return res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};

exports.postCommentToReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { username, body } = req.body;
    const comment = await addCommentToReview(review_id, username, body);
    return res.status(200).send({ comment });
  } catch (err) {
    next(err);
  }
};

exports.deleteCommentByID = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const comment = await removeCommentByID(comment_id);
    return res.status(204).send({ comment });
  } catch (err) {
    next(err);
  }
};
