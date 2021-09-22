const db = require("../db/connection.js");
const { countCommentsByReview } = require("../db/utils/data-manipulation.js");

exports.fetchReviewByID = async (review_id) => {
  const results = await db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id]);
  const fetchedReview = results.rows[0];

  fetchedReview.comment_count = await countCommentsByReview(review_id);

  return fetchedReview;
};
