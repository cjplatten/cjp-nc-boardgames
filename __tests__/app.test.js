const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api", () => {
  describe("/categories", () => {
    describe("GET", () => {
      test("200: responds with an array of category objects,with the properties: slug,  description", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then((res) => {
            res.body.categories.forEach((category) => {
              expect(category).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
              });
            });
          });
        //   test("200: responds with an array of category objects,with the properties: slug,  description", async () => {
        //     const res = await request(app)
        //     // return request(app)
        //       .get("api/categories")
        //       .expect(200)
        //     //   .then((res) => {
        //         expect(res.body).toMatchObject({
        //           slug: expect.any(String),
        //           description: expect.any(String),
        //         // });
        //       });
      });
    });
  });
});
