const db = require("../connection.js");

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
          name VARCHAR(80) NOT NULL
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
        title VARCHAR (100) NOT NULL,
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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
      )
      `);
    })
    .then(() => {
      console.log("Comments table created.");
    });
};

module.exports = seed;
