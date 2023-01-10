const express = require('express');
const router = express.Router();
const {
    signIn,
    signUp
} = require('../controllers/user');

router.route('/signIn').post(signIn);
router.route('/signUp').post(signUp);

module.exports = router;