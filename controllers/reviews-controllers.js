const { fetchReviewByID, editReview, fetchAllReviews } = require("../models/reviews-models");

exports.getAllReviews = async (req, res, next) => {
  const reviews = await fetchAllReviews();
  
  return res.status(200).send({reviews});
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
