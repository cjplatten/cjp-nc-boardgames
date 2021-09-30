const db = require("../db/connection.js");

exports.fetchCommentsbyReviewID = async (review_id) => { 
  const fetchedComments = await db.query(
    `SELECT * FROM comments WHERE review_id = $1`,
    [review_id]
  );

  if (fetchedComments.rows.length === 0) {
    const reviewExists = await db.query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
  
    if (reviewExists.rows.length === 0) return Promise.reject({ status: 404, msg: "Not found" });
  }
  return fetchedComments.rows;
};

exports.addCommentToReview = async (review_id, username, body) => {
    const addedComment = await db.query(`INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING *`, [review_id, username, body]);
    
    // if (addedComment.rows.length === 0) {
    //     return Promise.reject({ status: 404, msg: "Not found" });
    //   }
    return addedComment.rows[0]
}

exports.removeCommentByID = async (comment_id) => {
  const checkIDExists = await db.query(`SELECT * FROM comments WHERE comment_id = $1`, [comment_id])

  if (checkIDExists.rows.length === 0) {
    return Promise.reject({ status: 404, msg: "Not found" });
  }

  const deletedComment = await db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [comment_id])
  return deletedComment.rows;
}