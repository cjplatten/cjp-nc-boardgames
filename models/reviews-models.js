const db = require("../db/connection.js");
const { countCommentsByReview } = require("../db/utils/data-manipulation.js");

exports.fetchAllReviews = async ( sort_by = "created_at", order = "DESC", category ) => {
  if (order.toUpperCase() !== "DESC" && order.toUpperCase() !== "ASC") {
    return Promise.reject({ status: 400, msg: "Not a valid order" });
  }

  let queryStr = `SELECT * FROM reviews`;

  if (category) {
    queryStr += ` WHERE category = $1`;
  }

  queryStr += ` ORDER BY ${sort_by} ${order}`;

  const fetchedReviews = category
    ? await db.query(queryStr, [category])
    : await db.query(queryStr);

  if (fetchedReviews.rows.length === 0) {
    const categoryExists = await db.query(`SELECT * FROM categories WHERE slug = $1`, [category])
    if (categoryExists.rows.length === 0) return Promise.reject({ status: 404, msg: "Not found" });
  }

  const fetchReviewsPromises = fetchedReviews.rows.map(async (review) => {
    review.comment_count = await countCommentsByReview(review.review_id);
  });

  await Promise.all(fetchReviewsPromises);

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
  const alteredVotes = await db.query(
    `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
    [inc_votes, review_id]
  );

  if (alteredVotes.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }

  alteredVotes.rows[0].comment_count = await countCommentsByReview(review_id);

  return alteredVotes.rows[0];
};
