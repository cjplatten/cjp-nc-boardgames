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

exports.formatReviewData = (reviewData, categoryRef) => {
  const formattedReviewData = reviewData.map((review) => {
    return [
      review.title,
      review.review_body,
      review.designer,
      review.review_img_url,
      review.votes,
      review.category,
      review.owner,
    ];
  });
  return formattedReviewData;
};

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

// exports.createUserRef = (userRows) => {};

// exports.formatReviewOwnerData = (reviewData, userRef) => {
//     const formattedReviewOwnerData = reviewData.map((review) => {
//         return [
//           userRef[review.owner],
//         ];
//       });
//       return formattedReviewOwnerData;
// };
