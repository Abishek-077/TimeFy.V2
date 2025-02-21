const express = require('express');
const { signIn, signUp } = require('../controller/authController'); // Make sure this path is correct

const router = express.Router();

router.post('/signin', SignIn);
router.post('/signup', SignUp);

module.exports = router;
