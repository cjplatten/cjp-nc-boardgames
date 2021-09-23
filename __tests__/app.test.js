const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  describe("/notARoute", () => {
    describe("GET", () => {
      test('404: responds with object containing the message "Invalid URL"', async () => {
        const res = await request(app).get("/api/notARoute").expect(404);
        expect(res.body.msg).toBe("Invalid URL");
      });
    });
  });
  describe("/categories", () => {
    describe("GET", () => {
      test("200: responds with an array of category objects with the properties slug, description", async () => {
        const res = await request(app).get("/api/categories").expect(200);
        expect(res.body.categories).toHaveLength(4);
        res.body.categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
    });
  });
  describe("/reviews", () => {
    describe("GET", () => {
      test("200: responds with an array of review objects with the properties owner, title, review_id, review_body, designer, review_img_url, category, created_at, votes, comment_count", async () => {
        const res = await request(app).get("/api/reviews").expect(200);
        expect(res.body.reviews).toHaveLength(13);
        res.body.reviews.forEach((review) => {
          expect(review).toMatchObject({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          });
        });
      });
    });
    describe("accepts sort_by queries", () => {
      test("200: sorts by date by default", async () => {
        const res = await request(app).get("/api/reviews").expect(200);
        expect(res.body.reviews).toBeSortedBy("created_at");
      });
      test("200: sorts by other columns if passed a query", async () => {
        const res = await request(app)
          .get("/api/reviews?sort_by=votes")
          .expect(200);
        expect(res.body.reviews).toBeSortedBy("votes");
      });
      test('404: returns "column does not exist" if queries with a column that does not exist', async () => {
        const res = await request(app)
          .get("/api/reviews?sort_by=not_a_column")
          .expect(404);
        expect(res.body.msg).toBe("Column does not exist");
      });
    });
    describe("accepts order queries", () => {
      test("200: sorts by ascending by default or when passed ASC", async () => {
        const res = await request(app).get("/api/reviews").expect(200);
        expect(res.body.reviews).toBeSortedBy("created_at");

        const res2 = await request(app)
          .get("/api/reviews?order=asc")
          .expect(200);
        expect(res2.body.reviews).toBeSortedBy("created_at");
      });
      test("200: sorts by descending when passed DESC", async () => {
        const res = await request(app)
          .get("/api/reviews?order=desc")
          .expect(200);
        expect(res.body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });

        const res2 = await request(app)
          .get("/api/reviews?sort_by=votes&order=desc")
          .expect(200);
        expect(res2.body.reviews).toBeSortedBy("votes", { descending: true });
      });
      test('400: returns "Bad request" if not queried with ASC or DESC', async () => {
        const res = await request(app)
          .get("/api/reviews?order=azsdxcfgvbhnjmk")
          .expect(400);
        expect(res.body.msg).toBe("Not a valid order");
      });
    });
    describe("accepts category filter queries", () => {
      test("200: returns an object of games with only the category queried", async () => {
        const res = await request(app)
          .get("/api/reviews?category=dexterity")
          .expect(200);
        res.body.reviews.forEach((review) => {
          expect(review.category).toBe("dexterity");
        });
      });
      test('404: returns "Not found" if queried with a category that does not exist', async () => {
        const res = await request(app)
          .get("/api/reviews?category=asrtyu")
          .expect(404);
        expect(res.body.msg).toBe("Not found");
      });
      test('404: returns "Not found" if queried with a category that exists but doesn\'t have any reviews', async () => {
        const res = await request(app)
          .get("/api/reviews?category=children's games")
          .expect(404);
        expect(res.body.msg).toBe("Not found");
      });
    });
  });
  describe("/reviews/:review_id", () => {
    describe("GET", () => {
      test("200: responds with the correct review object with the properties owner, title, review_id, review_body, designer, review_img_url, category, created_at, votes, comment_count", async () => {
        const res = await request(app).get("/api/reviews/3").expect(200);
        expect(res.body.review).toMatchObject({
          owner: "bainesface",
          title: "Ultimate Werewolf",
          review_id: 3,
          review_body: "We couldn't find the werewolf!",
          designer: "Akihisa Okui",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          category: "social deduction",
          created_at: expect.any(String),
          votes: 5,
          comment_count: 3,
        });
      });
      test('400: responds with "Bad request" if passed a review id ithat isn\'t a number', async () => {
        const res = await request(app).get("/api/reviews/invalid").expect(400);
        expect(res.body.msg).toBe("Bad request");
      });
      test('404: responds with "Not found" if passed a review id that is a number but doesn\'t exist', async () => {
        const res = await request(app).get("/api/reviews/456789").expect(404);
        expect(res.body.msg).toBe("Not found");
      });
    });
    describe("PATCH", () => {
      test("200: responds with current votes if passed 0", async () => {
        const res = await request(app)
          .patch("/api/reviews/3")
          .send({ inc_votes: 0 })
          .expect(200);
        expect(res.body).toEqual({ updatedVotes: 5 });
      });
      test("200: increases votes when passed a positive integer", async () => {
        const res = await request(app)
          .patch("/api/reviews/3")
          .send({ inc_votes: 2 })
          .expect(200);
        expect(res.body).toEqual({ updatedVotes: 7 });
      });
      test("200: decreases votes when passed a negative integer", async () => {
        const res = await request(app)
          .patch("/api/reviews/3")
          .send({ inc_votes: -2 })
          .expect(200);
        expect(res.body).toEqual({ updatedVotes: 3 });
      });
      test('400: responds with "Bad request" if passed a review id ithat isn\'t a number', async () => {
        const res = await request(app)
          .patch("/api/reviews/invalid")
          .send({ inc_votes: 2 })
          .expect(400);
        expect(res.body.msg).toBe("Bad request");
      });
      test('404: responds with "Not found" if passed a review id that is a number but doesn\'t exist', async () => {
        const res = await request(app)
          .patch("/api/reviews/456789")
          .send({ inc_votes: 2 })
          .expect(404);
        expect(res.body.msg).toBe("Not found");
      });
      test('400: responds with "Bad request" if not passed inc_votes object', async () => {
        const res = await request(app)
          .patch("/api/reviews/invalid")
          .send({})
          .expect(400);
        expect(res.body.msg).toBe("Bad request");
      });
      test('400: responds with "Bad request" if passed inc_votes value that isn\'t a number', async () => {
        const res = await request(app)
          .patch("/api/reviews/invalid")
          .send({ inc_votes: "azesxdcfgvbh" })
          .expect(400);
        expect(res.body.msg).toBe("Bad request");
      });
    });
    describe("/comments", () => {
      describe("GET", () => {
        test("200: responds with array of comment objects for the given review id with the properties comment_id, votes, created_at, author, body", async () => {
          const res = await request(app).get("/api/reviews/3/comments").expect(200);
          expect(res.body.comments).toHaveLength(3);
          res.body.comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            });
          });
        });
        test('400: responds with "Bad request" if passed a review id ithat isn\'t a number', async () => {
          const res = await request(app).get("/api/reviews/invalid/comments").expect(400);
          expect(res.body.msg).toBe("Bad request");
        });
        test('404: responds with "Not found" if passed a review id that is a number but doesn\'t exist', async () => {
          const res = await request(app).get("/api/reviews/456789/comments").expect(404);
          expect(res.body.msg).toBe("Not found");
        });
      });
      describe.only('POST', () => {
        test('200: accepts an object with the properties username and body, adds this to comments table and returns a comment object with the properties comment_id, votes, created_at, author, body', async () => {
          const res = await request(app)
          .post('/api/reviews/3/comments')
          .send({ username: 'philippaclaire9' , body: 'wow what a great opinion'})
          .expect(200)

          expect(res.body.comment).toMatchObject({
            comment_id: 7,
            votes: 0,
            created_at: expect.any(String),
            author: 'philippaclaire9',
            body: 'wow what a great opinion',
          });

          const commentCountCheck = await request(app)
          .get("/api/reviews/3")
          .expect(200);
          expect(commentCountCheck.body.review.comment_count).toBe(4)
        });
        test('400: responds with "Bad request" if passed a review id ithat isn\'t a number', async () => {
          const res = await request(app).post("/api/reviews/invalid/comments")
          .send({ username: 'philippaclaire9' , body: 'wow what a great opinion'})
          .expect(400);
          expect(res.body.msg).toBe("Bad request");
        });
        test('404: responds with "Not found" if passed a review id that is a number but doesn\'t exist', async () => {
          const res = await request(app).post("/api/reviews/456789/comments")
          .send({ username: 'philippaclaire9' , body: 'wow what a great opinion'})
          .expect(404);
          expect(res.body.msg).toBe("Not found");
        });
        test('404: responds with "Not found" if passed a username that doesn\'t exist', async () => {
          const res = await request(app).post("/api/reviews/456789/comments")
          .send({ username: 'notreal' , body: 'wow what a great opinion'})
          .expect(404);
          expect(res.body.msg).toBe("Not found");
        });
      });
    });
  });
});
