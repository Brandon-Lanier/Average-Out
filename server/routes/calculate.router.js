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
    let finalCoins = [];
    let dailyTargetPrice = (target / days);
    console.log('daily target', dailyTargetPrice);

    for (coin of coins) {
        let total = 0;
        total = Number(coin.quantity) * Number(coin.current_price);
        finalCoins.push({
            coin_id: coin.coin_id,
            name: coin.name,
            quantity: coin.quantity,
            totalValue: total,
            user: req.user.id
        });
    }
    let totalCoinValue = finalCoins.reduce((accumulator, current) => accumulator + current.totalValue, 0);
    console.log('total val', totalCoinValue);
    let percentSplit = (dailyTargetPrice / totalCoinValue);
    console.log('Percent Split', percentSplit);
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
            target: target,
            dailyTargetPrice: dailyTargetPrice,
            percentage: percentSplit,
            days: days,
            user: req.user.id

        })
    }
    console.log('Final Results', splitQuantities);

    res.send(splitQuantities)

})

router.post('/save', (req, res) => {
  console.log('req the body in save', req.body);
    const coins = req.body.map(function(value) {return value.coinid;});
    const dailyTarget = req.body[0].dailyTargetPrice;
    const totalTarget = Number(req.body[0].target)
    const days = req.body[0].days
    console.log('days', days);
    
        const qryTxt = `
        INSERT INTO orders (coins, start_date, end_date, daily_target, total_target, user_id)
        VALUES ($1, CURRENT_DATE, CURRENT_DATE + ${days}, $2, $3, $4)
        `
        pool.query(qryTxt, [coins, dailyTarget, totalTarget, req.user.id])
        .then(result => {
            console.log('Somehow this worked!');
            res.sendStatus(201);
        }).catch(err => {
            console.log('Error posting the calculation in the orders table', err);
            res.sendStatus(500)
        })
})



module.exports = router;