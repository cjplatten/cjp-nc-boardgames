const express = require('express')
const { getCategories } = require('../controllers/categories-controllers')

const catergoriesRouter = express.Router()

catergoriesRouter.route('/').get(getCategories)

module.exports = catergoriesRouter