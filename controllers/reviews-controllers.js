const { fetchReviewByID } = require("../models/reviews-models");

exports.getReviewByID = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const review = await fetchReviewByID(review_id);
    return res.status(200).send({ review });
  } catch (err) {
      console.log(err)
    next(err);
  }
};
