const { fetchCommentsbyReviewID } = require("../models/comments-models");

exports.getCommentsbyReviewID = async (req, res, next) => {
  try {
      console.log(req.params)
    const { review_id } = req.params;
    const comments = await fetchCommentsbyReviewID(review_id);
    return res.status(200).send({ comments })
  } catch (err) {
    next(err);
  }
};
