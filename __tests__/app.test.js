const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  describe('/notARoute', () => {
    describe('GET', () => {
      test('404: responds with object containing the message "Invalid URL"', async () => {
        const res = await request(app)
        .get('/api/notARoute')
        .expect(404);
        expect(res.body.msg).toBe("Invalid URL");
      });
    });
  })
  describe("/categories", () => {
    describe("GET", () => {
      test("200: responds with an array of category objects,with the properties: slug,  description", async () => {
        const res = await request(app)
        .get("/api/categories")
        .expect(200);
        res.body.categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
    });
  });
});
