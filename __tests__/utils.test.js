const {
  formatCategoryData,
  formatUserData,
  formatReviewData,
  formatCommentData,
  countCommentsByReview,
} = require("../db/utils/data-manipulation");

describe("formatCategoryData", () => {
  test("returns empty array when passed no data", () => {
    const categoryData = [];
    const actual = formatCategoryData(categoryData);
    const expected = [];

    expect(actual).toEqual(expected);
  });
  test("returns nested arrays in the order (slug, description)", () => {
    const categoryData = [
      {
        slug: "spooky",
        description: "good for halloween",
      },
    ];
    const actual = formatCategoryData(categoryData);
    const expected = [["spooky", "good for halloween"]];

    expect(actual).toEqual(expected);
  });
  test("does not mutate the original categoryData", () => {
    const categoryData = [
      {
        slug: "spooky",
        description: "good for halloween",
      },
    ];
    const expected = [
      {
        slug: "spooky",
        description: "good for halloween",
      },
    ];

    formatCategoryData(categoryData);
    expect(categoryData).toEqual(expected);
  });
});

describe("formatUserData", () => {
  test("returns empty array when passed no data", () => {
    const userData = [];
    const actual = formatUserData(userData);
    const expected = [];

    expect(actual).toEqual(expected);
  });
  test("returns nested arrays in the order (username, avatar_url, name)", () => {
    const userData = [
      {
        username: "ghost22",
        avatar_url: "www.itsaniamge.com/spookyscary",
        name: "nick",
      },
    ];
    const actual = formatUserData(userData);
    const expected = [["ghost22", "www.itsaniamge.com/spookyscary", "nick"]];

    expect(actual).toEqual(expected);
  });
  test("does not mutate the original userData", () => {
    const userData = [
      {
        username: "ghost22",
        avatar_url: "www.itsaniamge.com/spookyscary",
        name: "nick",
      },
    ];
    const expected = [
      {
        username: "ghost22",
        avatar_url: "www.itsaniamge.com/spookyscary",
        name: "nick",
      },
    ];

    formatUserData(userData);
    expect(userData).toEqual(expected);
  });
});

describe("formatReviewData", () => {
  test("returns empty array when passed no data", () => {
    const reviewData = [];
    const actual = formatReviewData(reviewData);
    const expected = [];

    expect(actual).toEqual(expected);
  });
  test("returns nested arrays in the order (title, review_body, designer, review_img_url, votes, category, owner)", () => {
    const reviewData = [
      {
        title: "jenga",
        review_body: "could be sturdier",
        designer: "a name",
        review_img_url: "imagesite.co.uk/awesrdtfguhyji",
        votes: 4,
        category: "strategy",
        owner: "ghost22",
      },
    ];
    const actual = formatReviewData(reviewData);
    const expected = [
      [
        "jenga",
        "could be sturdier",
        "a name",
        "imagesite.co.uk/awesrdtfguhyji",
        4,
        "strategy",
        "ghost22",
      ],
    ];

    expect(actual).toEqual(expected);
  });
  test("does not mutate the original reviewData", () => {
    const reviewData = [
      {
        title: "jenga",
        review_body: "could be sturdier",
        designer: "a name",
        review_img_url: "imagesite.co.uk/awesrdtfguhyji",
        votes: 4,
        category: "strategy",
        owner: "ghost22",
      },
    ];
    const expected = [
      {
        title: "jenga",
        review_body: "could be sturdier",
        designer: "a name",
        review_img_url: "imagesite.co.uk/awesrdtfguhyji",
        votes: 4,
        category: "strategy",
        owner: "ghost22",
      },
    ];

    formatReviewData(reviewData);
    expect(reviewData).toEqual(expected);
  });
});

describe("formatCommentData", () => {
  test("returns empty array when passed no data", () => {
    const commentData = [];
    const actual = formatCommentData(commentData);
    const expected = [];

    expect(actual).toEqual(expected);
  });
  test("returns nested arrays in the order (author, review_id, votes, body)", () => {
    const commentData = [
      {
        author: "ghost22",
        review_id: 35,
        votes: 3,
        body: "thx for the votes",
      },
    ];
    const actual = formatCommentData(commentData);
    const expected = [["ghost22", 35, 3, "thx for the votes"]];

    expect(actual).toEqual(expected);
  });
  test("does not mutate the original commentData", () => {
    const commentData = [
      {
        author: "ghost22",
        review_id: 35,
        votes: 3,
        body: "thx for the votes",
      },
    ];
    const expected = [
      {
        author: "ghost22",
        review_id: 35,
        votes: 3,
        body: "thx for the votes",
      },
    ];

    formatCommentData(commentData);
    expect(commentData).toEqual(expected);
  });
});

describe("countComments", () => {
  test("returns 0 when no comments for review_id passed", async () => {
    // const 
    const review_id = 5;
    const actual = await countCommentsByReview(review_id);
    const expected = 0;

    expect(actual).toEqual(expected);
  });
  test("returns correct count when passed a review_id with comments", async () => {
    const review_id = 3;
    const actual = await countCommentsByReview(review_id);
    const expected = 3;

    expect(actual).toEqual(expected);
  });
});
