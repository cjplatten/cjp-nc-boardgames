const { fetchReviewByID, editReview, fetchAllReviews } = require("../models/reviews-models");

exports.getAllReviews = async (req, res, next) => {
  try {const { sort_by } = req.query

  const reviews = await fetchAllReviews(sort_by);
  
  return res.status(200).send({reviews});} catch (err) {
    // console.log(err);
    next(err)
  }
}

exports.getReviewByID = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await fetchReviewByID(review_id);
    // console.log(review, "getReviewByID controller");
    return res.status(200).send({ review });
  } catch (err) {
    // console.log(err, "getReviewByID err");
    next(err);
  }
};

exports.patchReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { inc_votes } = req.body;
    // console.log(req.body)
    
    const editedReview = await editReview(inc_votes, review_id);
    // console.log(editedReview);
    
    const updatedVotes = editedReview.votes;
    return res.status(200).send({ updatedVotes });
  } catch (err) {
    // console.log(err, "patchReview err");
    next(err);
  }
};
