const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");
const schedule = require('node-schedule');

const currentDate = new Date();


const job = schedule.scheduleJob('* * * * *', async function(){   
    const orders = await pool.query('SELECT * FROM orders')
    const assets = await pool.query('SELECT coin_id, quantity FROM assets')
    const coinsToFetch = orders.rows[0].coins
    const endDate = new Date(orders.rows[0].end_date);
    const daysLeft = (endDate - currentDate) / (1000 * 60 * 60 * 24);
    const orderCoins = assets.rows.filter(coin => coinsToFetch.includes(coin.coin_id))
    console.log('orderCoins', orderCoins);
    const coinsToQry = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsToFetch.join(',')}&order=gecko_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1d`);
    console.log(coinsToQry.data);
    const map = new Map();
    orderCoins.forEach(item => map.set(item.coin_id, item));
        coinsToQry.data.forEach(item => map.set(item.id, {
            ...map.get(item.id),
            ...item
        }));
    let mergedData = Array.from(map.values());
   let finalCoins = [];
   for (coin of mergedData) {
    let total = 0;
    total = Number(coin.quantity) * Number(coin.current_price);
    finalCoins.push({
        coin_id: coin.coin_id,
        name: coin.name,
        quantity: coin.quantity,
        totalValue: total,
    });
    console.log('final Coins', finalCoins);
    let totalCoinValue = finalCoins.reduce((accumulator, current) => accumulator + current.totalValue, 0);
    console.log('total val', totalCoinValue);
    let percentSplit = (orders.rows[0].daily_target / totalCoinValue);
    console.log('percent Split', percentSplit);
    let splitQuantities = [];
    for (coin of finalCoins) {
        let quantityToSell = coin.quantity * percentSplit;
        let dollarAmount = coin.totalValue * percentSplit;
        splitQuantities.push({
            coinid: coin.coin_id,
            name: coin.name,
            totalQuantity: coin.quantity,
            qtyToSell: quantityToSell,
            sellDollarAmount: dollarAmount,
            target: orders.rows[0].total_target,
            dailyTargetPrice: orders.rows[0].daily_target,
            percentage: percentSplit,
            days_left: Math.floor(daysLeft)
        })
        console.log('split quantities', splitQuantities);
        
    }
    console.log('Final Results', splitQuantities);
    
}
        
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