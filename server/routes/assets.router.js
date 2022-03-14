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



module.exports = router;