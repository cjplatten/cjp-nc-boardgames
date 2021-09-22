const reviews = require("../db/data/test-data/reviews");
const { fetchReviewByID, editReview } = require("../models/reviews-models");

exports.getReviewByID = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await fetchReviewByID(review_id);
    console.log(review, "getReviewByID controller");
    // if (review)
    return res.status(200).send({ review });
    // else {
    //   return Promise.reject({status: 404, msg: 'Not Found'})
    // }
  } catch (err) {
    console.log(err, "getReviewByID err");
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
    console.log(err, "patchReview err");
    next(err);
  }
};
