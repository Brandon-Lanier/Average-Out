const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");
const schedule = require('node-schedule');
const nodemailer = require("nodemailer");

const currentDate = new Date();
// '*/30 * * * * *'  30 second cron
// 00 00 09 * * * Every day run at 9 AM
// This function handles sending a daily updated calculation on what to sell across multiple assets.
const job = schedule.scheduleJob('* * * * *', async function () {
    const orders = await pool.query('SELECT * FROM orders WHERE open = true')
    console.log('orders', orders.rows);
    if (orders.rows.length > 0) {
        const assets = await pool.query('SELECT coin_id, quantity FROM assets')
        const orderid = orders.rows[0].id;
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
        let transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        let mailOptions = {
            from: 'test@gmail.com',
            to: 'test@gmail.com',
            subject: 'Daily Average Out Order',
            text: 'Here is your daily average out details',
            html: `
            <div style="display:flex; align-items:center; flex-direction:column;">
            <img src='https://i.postimg.cc/bvxyfjjf/image0000001.png' border='0' alt='logo' width="275px" height="213px" />
                <h1>Daily Summary of your sell order:</h1>
                <h3>Target Return: $${splitQuantities[0].target}.</h3>
                <h4>Daily Target Price: $${splitQuantities[0].dailyTargetPrice}.</h4>
                <h4>Days Remaining: ${splitQuantities[0].days_left}.</h4>
                <a href="http://localhost:3000/#/orders/details/${orderid}" style="color: black;">Click To View Order</a>
                    <table style="border: 1px solid;border-collapse: collapse;padding: 5px;">
                        <thead style="background-color: #d4d4d4;border:1px solid;">
                            <tr style="border:1px solid; padding:5px;">
                                <th style="border:1px solid;">Asset</th>
                                <th style="border:1px solid;">Quantity To Sell</th>
                                <th style="border:1px solid;">Dollar Amount</th>
                                <th style="border:1px solid;">Percent Of Asset</th>
                            </tr>
                        </thead>
                        <tbody style="border:1px solid;">
                            <tr style="border:1px solid;">
                                    <td style="border:1px solid;">${splitQuantities[0].name}</td>
                                    <td style="border:1px solid;">${splitQuantities[0].qtyToSell.toFixed(4)}</td>
                                    <td style="border:1px solid;">$${splitQuantities[0].sellDollarAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td style="border:1px solid;">${(splitQuantities[0].percentage * 100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                    <td style="border:1px solid;">${splitQuantities[1].name}</td>
                                    <td style="border:1px solid;">${splitQuantities[1].qtyToSell.toFixed(4)}</td>
                                    <td style="border:1px solid;">$${splitQuantities[1].sellDollarAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td style="border:1px solid;">${(splitQuantities[1].percentage * 100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                    <td style="border:1px solid;">${splitQuantities[2].name}</td>
                                    <td style="border:1px solid;">${splitQuantities[2].qtyToSell.toFixed(4)}</td>
                                    <td style="border:1px solid;">$${splitQuantities[2].sellDollarAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td style="border:1px solid;">${(splitQuantities[2].percentage * 100).toFixed(2)}%</td>
                            </tr>
                            <tr>
                                    <td style="border:1px solid;">${splitQuantities[3].name}</td>
                                    <td style="border:1px solid;">${splitQuantities[3].qtyToSell.toFixed(4)}</td>
                                    <td style="border:1px solid;">$${splitQuantities[3].sellDollarAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td style="border:1px solid;">${(splitQuantities[3].percentage * 100).toFixed(2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                    <div height="25px">
                        
                    </div>
             </div>`

        };
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error " + err);
            } else {
                console.log("Email sent successfully");
            }
        });
    }
    console.log('No Orders to get');
     //End loop through users
})

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const qryTxt = `SELECT * FROM orders WHERE user_id = $1 and open = true`
        pool.query(qryTxt, [req.user.id])
            .then(result => {
                res.send(result.rows)
            }).catch(err => {
                console.log('Error in the orders GET', err);
            })
    } else {
        res.sendStatus(403);
    }
})

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
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
        const orderId = orders.rows[0].id
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
                current_price: coin.current_price,
                change: coin.price_change_percentage_24h
            });
        }
        let totalCoinValue = finalCoins.reduce((accumulator, current) => accumulator + current.totalValue, 0);

        let percentSplit = (orders.rows[0].daily_target / totalCoinValue);
        let splitQuantities = [];
        for (coin of finalCoins) {
            let quantityToSell = coin.quantity * percentSplit;
            let dollarAmount = coin.totalValue * percentSplit;
            splitQuantities.push({
                orderid: orderId,
                coinid: coin.coin_id,
                name: coin.name,
                totalQuantity: coin.quantity,
                qtyToSell: quantityToSell,
                sellDollarAmount: dollarAmount,
                target: orders.rows[0].total_target,
                dailyTargetPrice: orders.rows[0].daily_target,
                percentage: percentSplit,
                days_left: Math.floor(daysLeft),
                current_price: coin.current_price,
                change: coin.change
            })
        }
        res.send(splitQuantities)
        console.log('Final Results', splitQuantities);
    } else {
        res.sendStatus(403)
    }
})

router.put(`/executeday`, (req, res) => {
    if (req.isAuthenticated()) {
        const id = req.body[0].orderid
        const updateCoins = req.body
        const qryTxt = `UPDATE assets SET quantity = quantity - $1 WHERE coin_id = $2 AND user_id = $3`
        for (coin of updateCoins) {
            pool.query(qryTxt, [coin.qtyToSell, coin.coinid, req.user.id])
                .then(result => {
                    console.log('It worked', result.rows);
                    res.sendStatus(201)
                }).catch(err => {
                    console.log('Error in assets/calc update', err);
                })
        }
    } else {
        res.sendStatus(403)
    }
})

router.put(`/skipday`, (req, res) => {
    if (req.isAuthenticated()) {
        const id = req.body[0].orderid;
        const qryTxt = `UPDATE orders SET end_date = end_date + 1 WHERE id = $1 and user_id = $2`
        pool.query(qryTxt, [id, req.user.id])
        .then(result => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('Error in skip day router', err);
        })
    }
    
})

module.exports = router;