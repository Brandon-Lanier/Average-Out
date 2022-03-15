const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//Get all the assets a user has stored in the DB
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

//This will handle getting a single detail for a coin
router.get('/details/:coinid', (req, res) => {
    if (req.isAuthenticated()) {
      const id = req.params.coinid;
      console.log('coin id in details assets', id);
      const qryTxt = `
      SELECT * FROM assets WHERE "coin_id = $1 and user_id = $2;
      `
      pool.query(qryTxt, [id, req.user.id])
      .then(result => {
          res.send(result.rows)
      }).catch(err => {
          console.log('Error in get asset details', err);
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
        ON CONFLICT ("coin_id")
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

router.get('/alldetails/:id')
    

module.exports = router;