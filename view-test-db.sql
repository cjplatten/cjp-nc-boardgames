\c nc_games_test

SELECT * FROM categories;
-- SELECT COUNT (slug) FROM categories;

SELECT * FROM reviews;
-- SELECT COUNT (review_id) FROM reviews;

SELECT * FROM users;
-- SELECT COUNT (username) FROM users;

SELECT * FROM comments;
-- SELECT COUNT (comment_id) FROM comments;

SELECT * FROM comments where review_id = 3;