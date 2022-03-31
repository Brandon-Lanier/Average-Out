const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");
const nodemailer = require("nodemailer");

const currentDate = new Date();
// '*/30 * * * * *'  30 second cron
// 00 00 09 * * * Every day run at 9 AM
// This function handles sending a daily updated calculation on what to sell across multiple assets.
async function runDaily() {
    const orders = await pool.query(`
    SELECT orders.*, "user".firstname, "user".email FROM orders
    JOIN "user" ON orders.user_id = "user".id
    WHERE orders.open = true;`)
    console.log('orders', orders.rows);
    if (orders.rows.length > 0) {
        for (order of orders.rows) {
            const assets = await pool.query(`SELECT coin_id, quantity FROM assets WHERE user_id = $1`, [order.user_id])
            const orderid = order.id;
            const coinsToFetch = order.coins
            const endDate = new Date(order.end_date);
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

            let percentSplit = (order.daily_target / totalCoinValue);
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
                    target: order.total_target,
                    dailyTargetPrice: order.daily_target,
                    percentage: percentSplit,
                    days_left: Math.floor(daysLeft)
                })
            }
            console.log('Final Results', splitQuantities);
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                    clientId: process.env.OAUTH_CLIENTID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN
                }
            });
            let mailOptions = {
                from: 'average.out.app@gmail.com',
                to: `${order.email}`,
                subject: 'Daily Average Out Order',
                text: 'Here is your daily average out details',
                html: `
            <div style="display:flex; align-items:center; flex-direction:column;">
            <img src='https://i.postimg.cc/bvxyfjjf/image0000001.png' border='0' alt='logo' width="275px" height="213px" />
                <h1>Daily Summary of your sell order:</h1>
                <h3>Hello, ${order.firstname}!
                <h3>Target Return: $${splitQuantities[0].target}.</h3>
                <h4>Days Remaining: ${splitQuantities[0].days_left}.</h4>
                <h4><a href="https://average-out.herokuapp.com/#/orders/details/${orderid}" style="color: black;">Click To View Your Daily Summary</a></h4>
             </div>`

            };
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            });
        } //End loop through users
    }
    console.log('No Orders to get');
}

module.exports = runDaily;