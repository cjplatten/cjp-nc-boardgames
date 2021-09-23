const express = require("express");
const apiRouter = require("./routes/api-router.js");
const {
  handleServerErrors,
  handlePQSLErrors,
  handleCustomErrors,
} = require("./errors/errors.js");

const app = express();
app.use(express.json());

/*
Essential endpoints

GET /api/categories
GET /api/reviews/:review_id
PATCH /api/reviews/:review_id
GET /api/reviews
GET /api/reviews/:review_id/comments
POST /api/reviews/:review_id/comments
GET /api

All of your endpoints should send the responses specified below in an object, with a key name of what it is that being sent.
*/

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handlePQSLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
