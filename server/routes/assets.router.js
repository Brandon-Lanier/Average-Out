const express = require('express');
const axios = require("axios");
const pool = require('../modules/pool');
const router = express.Router();


// Get assets stored in DB and merge that with current market data.
// This is super cool
router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        const dbCoinRes = await pool.query(`SELECT * FROM assets WHERE "user_id" = $1;`, [req.user.id]);
        let coinIdsToFetch = dbCoinRes.rows.map((coin) => {
            return coin.coin_id;
        })
        const coinsToQry = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIdsToFetch.join(',')}&order=gecko_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1d`);
        const map = new Map();
        dbCoinRes.rows.forEach(item => map.set(item.coin_id, item));
        coinsToQry.data.forEach(item => map.set(item.id, {
            ...map.get(item.id),
            ...item
        }));
        let mergedData = Array.from(map.values());
        mergedData = mergedData.sort((a, b) => (a.current_price < b.current_price) ? 1 : -1); // Sort by price DESC
        // console.log('hopeful output', mergedData);
        res.send(mergedData);
    } else {
        res.sendStatus(403)
    }
})

//This will handle getting a single detail for a coin
router.get('/details/:coinid', (req, res) => {
    if (req.isAuthenticated()) {
        const coinid = req.params.coinid;
        console.log('coin id in details assets', coinid);
        const qryTxt = `
      SELECT * FROM assets WHERE coin_id = $1 AND user_id = $2;
      `
        pool.query(qryTxt, [coinid, req.user.id])
            .then(result => {
                console.log('result in asset details', result.rows);
                res.send(result.rows)
            }).catch(err => {
                console.log('Error in get asset details', err);
            })
    } else {
        res.sendStatus(403)
    }
})

// Handles adding new assets to the user's portfolio.  If an asset already exist, it will update the quantity.
router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user.id);
        const qty = Number(req.body.quantity).toFixed(4)
        const coinId = req.body.coin.id // Coin id is main reference to live data on DOM
        // const qty = quantity.toFixed(4) // Changing to 4 decimals for DB storage
        const userId = req.user.id
        const qryTxt = `
            INSERT INTO "assets" ("coin_id", "quantity", "user_id") 
            VALUES ($1, $2, $3)
            ON CONFLICT ("coin_id")
            DO UPDATE SET "quantity" = "assets"."quantity" + $4;`
        pool.query(qryTxt, [coinId, qty, userId, qty])
            .then(result => {
                res.sendStatus(201)
            }).catch(err => {
                console.log('Error in Add Coin POST', err);
            })
    } else {
        res.sendStatus(403);
    }
})

router.delete('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('coinid to delete', req.params.id);
        console.log('user', req.user.id);
        const qryTxt = `
            DELETE FROM "assets" WHERE "id" = $1 and "user_id" = $2;`
        pool.query(qryTxt, [req.params.id, req.user.id])
            .then(res => {
                res.sendStatus(200)
            }).catch(err => {
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403)
    }
})

module.exports = router;