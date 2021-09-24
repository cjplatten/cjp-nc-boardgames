const express = require("express");
const apiRouter = require("./routes/api-router.js");
const {
  handleServerErrors,
  handlePQSLErrors,
  handleCustomErrors,
} = require("./errors/errors.js");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handlePQSLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
