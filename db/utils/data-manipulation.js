const db = require("../connection.js");

// extract any functions you are using to manipulate your data, into this file
exports.formatCategoryData = (categoryData) => {
  const formattedCategoryData = categoryData.map((category) => {
    return [category.slug, category.description];
  });
  return formattedCategoryData;
};

exports.formatUserData = (userData) => {
  const formattedUserData = userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
  return formattedUserData;
};

exports.formatReviewData = (reviewData) => {
  const formattedReviewData = reviewData.map((review) => {
    return [
      review.title,
      review.review_body,
      review.designer,
      review.review_img_url,
      review.votes,
      review.category,
      review.owner,
      review.created_at
    ];
  });
  return formattedReviewData;
};

exports.formatCommentData = (commentData, reviewRows) => {
  const formattedCommentData = commentData.map((comment) => {
    return [
      comment.author, 
      comment.review_id, 
      comment.votes, 
      comment.body, 
      comment.created_at
    ];
  });
  return formattedCommentData;
};

exports.countCommentsByReview = async (review_id) => {
  const reviewComments = await db.query(
    `SELECT * FROM comments WHERE review_id = $1`,
    [review_id]
  );
  return reviewComments.rows.length;
};

/*
 Below: start to code that pulls the primary key values from the referenced data - not needed currently as values available in db source data but may be needed if problems found later.
*/

// exports.createCategoryRef = (categoryRows) => {
//     const categoryRef = {}
//     categoryRows.forEach((category) => {
//         categoryRef[]
//     })
// };

// exports.formatReviewData = (reviewData, categoryRef) => {
//   const formattedReviewData = reviewData.map((review) => {
//     return [
//       review.title,
//       review.review_body,
//       review.designer,
//       review.review_img_url,
//       review.votes,
//       categoryRef[review.category],
//     ];
//   });
//   return formattedReviewData;
// };

// exports.formatReviewOwnerData = (reviewData, userRef) => {
//     const formattedReviewOwnerData = reviewData.map((review) => {
//         return [
//           userRef[review.owner],
//         ];
//       });
//       return formattedReviewOwnerData;
// };

// exports.createReviewRef = (reviewRows) => {};
// exports.formatCommentData = (commentData, reviewRows) => {}
