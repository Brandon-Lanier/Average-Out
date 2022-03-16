const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");


router.get('/', (req, res) => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h')
        .then(result => {
            res.send(result.data)
        }).catch(err => {
            console.log('Error Getting Market Data', err);
            res.sendStatus(500)
        })
})


module.exports = router;