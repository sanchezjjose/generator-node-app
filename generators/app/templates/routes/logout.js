'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {

    req.session.destroy(err => {
        if (err) {
            res.status(500);
            res.send(err.message);

        } else {
            res.clearCookie('Authorized');
            res.redirect('/');
        }
    });
});

module.exports = router;
