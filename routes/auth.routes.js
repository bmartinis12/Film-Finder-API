const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../controllers/auth.controller');

// Recieve login data 

router.post('/login', loginUser);

// Recieve register data 

router.post('/register', registerUser);

module.exports = router;