const express = require('express');
const { signIn, signUp } = require('../controller/authController');

const router = express.Router();

router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;
