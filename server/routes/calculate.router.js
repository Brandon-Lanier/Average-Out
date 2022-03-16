const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");


// Not working when i try to send from client
router.post('/', (req, res) => {
    const target = req.body.target;
    const days = req.body.days;
    const coins = req.body.coins
    console.log('target', target)
    console.log('days', days);
    console.log('coins', coins);
    res.sendStatus(200)
    .catch(err => {
        console.log('error in calc router', err);
        
    })
})



module.exports = router;