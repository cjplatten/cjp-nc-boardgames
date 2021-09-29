const { fetchReviewByID, editReview, fetchAllReviews } = require("../models/reviews-models");

exports.getAllReviews = async (req, res, next) => {
  try {const { sort_by, order, category } = req.query

  const reviews = await fetchAllReviews(sort_by, order, category);
  
  return res.status(200).send({reviews});} catch (err) {
    next(err)
  }
}

exports.getReviewByID = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await fetchReviewByID(review_id);
  
    return res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};

exports.patchReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { inc_votes } = req.body;
    
    const review = await editReview(inc_votes, review_id);
  
    return res.status(200).send({ review });
  } catch (err) {
    next(err);
  }
};

