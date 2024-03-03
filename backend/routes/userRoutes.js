const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Corrected route paths in user.js
router.post('/signup', registerUser);
router.post('/login', loginUser);


module.exports = router;
