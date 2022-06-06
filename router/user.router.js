const express = require('express');
const { fetchUser } = require('../controller/user.controller');

var router = express.Router();

router.get('/', (req, res) => {
    res.json('just checking user')
});

router.post('/login', (req, res) => {
    fetchUser(req, res);
});

module.exports = router; 