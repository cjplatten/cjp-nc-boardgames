const express = require('express');
const apiRouter = require('./routes/api-router.js')

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


/*GET /api/categories
Responds with:

an array of category objects, each of which should have the following properties:
slug
description
*/

