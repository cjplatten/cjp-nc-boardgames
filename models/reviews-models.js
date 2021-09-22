const db = require("../db/connection.js");
const { countCommentsByReview } = require("../db/utils/data-manipulation.js");

exports.fetchAllReviews = async () => {
  const fetchedReviews = await db.query(`SELECT * FROM reviews`);
  // fetchedReviews.rows.forEach((review) => {
  //   review.comment_count = await countCommentsByReview(review_id);
  // });

  const fetchReviewsPromises = fetchedReviews.rows.map( async(review) => {
    review.comment_count = await countCommentsByReview(review.review_id);
  })

  await Promise.all(fetchReviewsPromises);

  console.log(fetchedReviews.rows)
  return fetchedReviews.rows;
};

exports.fetchReviewByID = async (review_id) => {
  const results = await db.query(`SELECT * FROM reviews WHERE review_id = $1`, [
    review_id,
  ]);
  const fetchedReview = results.rows[0];
  if (fetchedReview === undefined) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }
  fetchedReview.comment_count = await countCommentsByReview(review_id);
  return fetchedReview;
};

exports.editReview = async (inc_votes, review_id) => {
  // console.log('votes', votes)
  const alteredVotes = await db.query(
    `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING votes;`,
    [inc_votes, review_id]
  );
  // console.log(alteredVotes.rows)
  if (alteredVotes.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }
  return alteredVotes.rows[0];
};
