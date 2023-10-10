const express = require('express');
const router = express.Router();
require('dotenv').config();
const { getDetails, updateReviews, getReviews } = require('../controllers/detail.controller');
const { validateToken } = require('../middleware/validateToken');

// Get move or show detailed data 

router.get('/:id', getDetails);

// Get movie or show reviews

router.get('/:id/review', getReviews);

// Update reviews 

router.patch('/:id/review', validateToken, updateReviews);

module.exports = router;