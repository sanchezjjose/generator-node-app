'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.render('login', { layout: false });
});

router.post('/', function (req, res, next) {
	const username = req.body.username;
	const password = req.body.password;

	// TODO: replace this with express session and use environment variables for password
	if (username === 'admin' && password === 'admin') {
		res.cookie('Authorized', 'admin', { maxAge: 365*24*60*60*1000 });
		res.redirect('/');

	} else {
		res.render('login', { layout: false });
	}
});

module.exports = router;

