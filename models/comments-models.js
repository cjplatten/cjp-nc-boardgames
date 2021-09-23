const db = require("../db/connection.js");

exports.fetchCommentsbyReviewID = async (review_id) => {
    console.log(review_id)
    const fetchedComments = await db.query(`SELECT * FROM comments WHERE review_id = $1`, [
      review_id,
    ]);
    console.log(fetchedComments.rows)
    // if (fetchedComments.rows === undefined) {
    //   return Promise.reject({ status: 404, msg: "Not found" });
    // }
    // fetchedComments.comment_count = await countCommentsByReview(review_id);
    return fetchedComments.rows;
  };