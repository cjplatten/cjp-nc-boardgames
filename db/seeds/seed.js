const format = require("pg-format");
const db = require("../connection.js");
const {
  formatCategoryData,
  formatUserData,
  formatReviewData,
  createReviewRef,
  formatCommentData,
} = require("../utils/data-manipulation.js");

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. create tables
  // 2. insert data
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      console.log("All tables dropped.");
    })
    .then(() => {
      return db.query(`
      CREATE TABLE categories (
        slug VARCHAR(100) PRIMARY KEY,
        description TEXT NOT NULL
      );
      `);
    })
    .then(() => {
      console.log("Categories table created.");
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
          username VARCHAR(80) PRIMARY KEY,
          avatar_URL VARCHAR(255) NOT NULL,
          name VARCHAR(150) NOT NULL
        );
      `);
    })
    .then(() => {
      console.log("Users table created.");
    })
    .then(() => {
      return db.query(`
      CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR (150) NOT NULL,
        review_body TEXT NOT NULL,
        designer VARCHAR(150),
        review_img_url VARCHAR(255) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category TEXT REFERENCES categories(slug) NOT NULL,
        owner TEXT REFERENCES users(username) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
      )
      `);
    })
    .then(() => {
      console.log("Reviews table created.");
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author TEXT REFERENCES users(username) NOT NULL,
        review_id INT REFERENCES reviews(review_id) NOT NULL,
        votes INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP ,
        body TEXT NOT NULL
      )
      `);
    })
    .then(() => {
      console.log("Comments table created.");
    })
    .then(() => {
      const queryStr = format(
        `
      INSERT INTO categories (
        slug, description
        )
        VALUES
        %L
        RETURNING *;
        `,
        formatCategoryData(categoryData)
      );
      return db.query(queryStr);
    })
    .then((categoryInsertResults) => {
      console.log(categoryInsertResults.rows);
    })
    .then(() => {
      const queryStr = format(
        `
      INSERT INTO users (
        username, avatar_url, name
        )
        VALUES
        %L
        RETURNING *;
        `,
        formatUserData(userData)
      );
      return db.query(queryStr);
    })
    .then((userInsertResults) => {
      console.log(userInsertResults.rows);
    })
    .then(() => {
      const queryStr = format(
        `
        INSERT INTO reviews (
          title, review_body, designer, review_img_url, votes, category, owner
          )
          VALUES
          %L
          RETURNING *;
          `,
        formatReviewData(reviewData)
      );
      return db.query(queryStr);
    })
    .then((reviewInsertResults) => {
      console.log(reviewInsertResults.rows);
    })
    .then(() => {
      const queryStr = format(
        `
        INSERT INTO comments (
          author, review_id, votes, body
          )
          VALUES
          %L
          RETURNING *;
          `,
        formatCommentData(commentData)
      );
      return db.query(queryStr);
    })
    .then((commentInsertResults) => {
      console.log(commentInsertResults.rows);
    });
};

module.exports = seed;
