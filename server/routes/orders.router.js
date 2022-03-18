const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");
const schedule = require('node-schedule');


const job = schedule.scheduleJob('* * * * *', async function(){
    const orders = await pool.query('SELECT * FROM orders')
    const assets = await pool.query('SELECT coin_id, quantity FROM assets')
    console.log('orders', orders.rows);
    console.log('assets', assets.rows);
//     let coinIdsToFetch = [];
//     coinIdsToFetch = orders.rows[0].coins;
    // console.log(coinIdsToFetch);
    // const coinsToQry = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIdsToFetch.join(',')}&order=gecko_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1d`);
//     // console.log('coins to query', coinsToQry.data);
        
})

router.get('/', (req, res) => {
    const qryTxt = `SELECT * FROM orders WHERE user_id = $1`
    pool.query(qryTxt, [req.user.id])
    .then(result => {
        console.log('orders', result.rows);
        res.send(result.rows)  
    }).catch(err => {
        console.log('Error in the orders GET', err);  
    })
})


module.exports = router;