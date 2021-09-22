const db = require("../db/connection.js");
const { countCommentsByReview } = require("../db/utils/data-manipulation.js");

exports.fetchReviewByID = async (review_id) => {
  const results = await db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id]);
  const fetchedReview = results.rows[0];
if (fetchedReview !== undefined) {
  fetchedReview.comment_count = await countCommentsByReview(review_id);
} else {
  return Promise.reject({status: 404, msg: 'Not found'})
}
  
  return fetchedReview;
};
