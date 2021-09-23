const db = require("../db/connection.js");

exports.fetchCommentsbyReviewID = async (review_id) => {
  const fetchedComments = await db.query(
    `SELECT * FROM comments WHERE review_id = $1`,
    [review_id]
  );
  if (fetchedComments.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }
  return fetchedComments.rows;
};
