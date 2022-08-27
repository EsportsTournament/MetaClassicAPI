const express = require('express');
const { fetchYoutubeVideoList, fetchAllPlayersDetails } = require('../controller/common.controller');

var router = express.Router();

router.get('/', (req, res) => {
    res.json('just checking youtube')
});

router.post('/fetchYtVid', (req, res) => {
    console.log('hitting youtube');
    fetchYoutubeVideoList(req, res);
});

router.post('/fetchAllPlayersDetails', (req, res) => {
    console.log('hitting coc');
    fetchAllPlayersDetails(req, res);
});

module.exports = router; 