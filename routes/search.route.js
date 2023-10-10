const express = require('express');
const router = express.Router();
require('dotenv').config();
const { getShow, getMovie } = require('../controllers/search.controller')

// Get movies with search query 

router.get('/movie/:query', getMovie);

// Get shows with search query 

router.get('/show/:query', getShow);

module.exports = router;
