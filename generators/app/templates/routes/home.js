'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('home');
});

// React initial page load POST request
router.post('/', function (req, res, next) {
    res.status(200).json({
        message: 'success'
    });
});

module.exports = router;
