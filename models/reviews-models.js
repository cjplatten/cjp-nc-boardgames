const db = require("../db/connection.js");
const { countCommentsByReview } = require("../db/utils/data-manipulation.js");

exports.fetchReviewByID = async (review_id) => {
  const results = await db.query(`SELECT * FROM reviews WHERE review_id = $1`, [
    review_id,
  ]);
  const fetchedReview = results.rows[0];
  if (fetchedReview !== undefined) {
    fetchedReview.comment_count = await countCommentsByReview(review_id);
  } else {
    return Promise.reject({ status: 404, msg: "Not found" });
  }
  return fetchedReview;
};

exports.editReview = async (votes, review_id) => {
  // console.log('votes', votes)
  const alteredVotes = await db.query(
    `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING votes;`,
    [votes, review_id]
  );
  // const results = await db.query(`SELECT * FROM reviews WHERE review_id = $1`, [
  //   review_id,
  // ]);
    // console.log(alteredVotes.rows[0])
  return alteredVotes.rows[0];
};
