const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const qryTxt = `
        SELECT * FROM assets WHERE "user_id" = $1
    `
    pool.query(qryTxt, [req.user.id])
        .then(result => {
            console.log('Results in get for assets', result.rows);
            res.send(result.rows)
        }).catch(err => {
            console.log('Error in get assets router', err);
        })
} else {
    res.sendStatus(403)
}
})

router.post('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user.id);
        const quantity = Number(req.body.quantity)
        const coinId = req.body.coin.id
        const qty = quantity.toFixed(4) // Changing to 4 decimals for DB storage
        const userId = req.user.id
        const qryTxt = `
        INSERT INTO "assets" ("coin_id", "quantity", "user_id") 
        VALUES ($1, $2, $3)
        ON CONFLICT ("coinId")
        DO UPDATE SET "quantity" = "assets"."quantity" + $4;`

        pool.query(qryTxt, [coinId, qty, userId, qty])
            .then(result => {
                console.log('You added a coin!');
                res.sendStatus(201)
            }).catch(err => {
                console.log('Error in Add Coin POST', err);
            })
    } else {
        res.sendStatus(403);
    }
})


module.exports = router;