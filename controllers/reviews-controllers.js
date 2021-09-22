const reviews = require("../db/data/test-data/reviews");
const { fetchReviewByID } = require("../models/reviews-models");

exports.getReviewByID = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await fetchReviewByID(review_id);
    console.log(review, 'getReviewByID controller')
    // if (review) 
    return res.status(200).send({ review });
    // else {
    //   return Promise.reject({status: 404, msg: 'Not Found'})
    // }
  } catch (err) {
      console.log(err, 'getReviewByID err')
    next(err);
  }
};
