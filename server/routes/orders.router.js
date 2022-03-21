const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");
const schedule = require('node-schedule');
const nodemailer = require("nodemailer");

const currentDate = new Date();

// This function handles sending a daily updated calculation on what to sell across multiple assets.
const job = schedule.scheduleJob('* * * * *', async function () {
    const orders = await pool.query('SELECT * FROM orders')
    if (orders.rows.length > 0) {
        const assets = await pool.query('SELECT coin_id, quantity FROM assets')
        const coinsToFetch = orders.rows[0].coins
        const endDate = new Date(orders.rows[0].end_date);
        const daysLeft = (endDate - currentDate) / (1000 * 60 * 60 * 24);
        const orderCoins = assets.rows.filter(coin => coinsToFetch.includes(coin.coin_id))
        const coinsToQry = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsToFetch.join(',')}&order=gecko_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1d`);
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
        }
        let totalCoinValue = finalCoins.reduce((accumulator, current) => accumulator + current.totalValue, 0);

        let percentSplit = (orders.rows[0].daily_target / totalCoinValue);
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
        }
        console.log('Final Results', splitQuantities);
    }
    console.log('No Orders to get');

    let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1ecfec0b678af1",
          pass: "05da23f6fc8087"
        }
      });

      let mailOptions = {
        from: 'test@gmail.co',
        to: 'test@gmail.com',
        subject: 'Nodemailer Project',
        text: 'Hi from your nodemailer project',
        html: `Daily Summary of your sell order:
        <div>
   
        </div>`

      };
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });


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

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()){
    const qryTxt = `DELETE FROM orders WHERE id = $1 and user_id = $2;`;
    pool.query(qryTxt, [req.params.id, req.user.id])
        .then(result => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('Error deleting the order', err);
        })
    } else {
        res.sendStatus(403)
    }
})

router.get('/details/:id', async (req, res) => {
    if (req.isAuthenticated()) {
        const orders = await pool.query(`SELECT * FROM orders WHERE id = $1 and user_id = $2;`, [req.params.id, req.user.id])
        const assets = await pool.query('SELECT coin_id, quantity FROM assets WHERE user_id = $1', [req.user.id])
        console.log('orders.rows', orders.rows);
        const coinsToFetch = orders.rows[0].coins
        const endDate = new Date(orders.rows[0].end_date);
        const daysLeft = (endDate - currentDate) / (1000 * 60 * 60 * 24);
        const orderCoins = assets.rows.filter(coin => coinsToFetch.includes(coin.coin_id))
        const coinsToQry = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsToFetch.join(',')}&order=gecko_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1d`);
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
        }
        let totalCoinValue = finalCoins.reduce((accumulator, current) => accumulator + current.totalValue, 0);

        let percentSplit = (orders.rows[0].daily_target / totalCoinValue);
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
        }
        res.send(splitQuantities)
        console.log('Final Results', splitQuantities);    
    } else {
        res.sendStatus(403)
    }
})



module.exports = router;