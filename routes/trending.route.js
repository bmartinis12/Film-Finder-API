const express = require('express');
const router = express.Router();
require('dotenv').config();
const { getTrendingShows, getTrendingMovies, updateTrendingMovieList, updateTrendingShowList } = require('../controllers/trending.controller');

// Get trending shows 

router.get('/shows', getTrendingShows);

// Put trending shows 

router.put('/shows', updateTrendingShowList);

// Get trending movies

router.get('/movies', getTrendingMovies);

// Put trending shows 

router.put('/movies', updateTrendingMovieList);

module.exports = router;