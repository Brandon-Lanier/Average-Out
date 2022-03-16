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
            user: req.user.id

        })
    }
    console.log('Final Results', splitQuantities);
    
    res.send(splitQuantities)
   
    })

module.exports = router;