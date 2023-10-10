const express = require('express');
const router = express.Router();
const { getCurrentUser, savedFilms } = require('../controllers/user.controller');
const { validateToken } = require('../middleware/validateToken');

// Get current user 

router.get('/current/:id', validateToken, getCurrentUser);

// Patch saved films 

router.patch('/saved', validateToken, savedFilms);


module.exports = router;