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
      test("200: responds with an array of category objects with the properties slg", async () => {
        const res = await request(app).get("/api/categories").expect(200);
        res.body.categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
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
        expect(res.body.msg).toBe('Bad request')
      });
      test('404: responds with "Not found" if passed a review id that is a number but doesn\'t exist', async () => {
        const res = await request(app).get("/api/reviews/456789").expect(404);
        expect(res.body.msg).toBe('Not found')
      });
    });
  });
});
