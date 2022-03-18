const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");
const cron = require('node-cron');


 
        
//         let coinIdsToFetch = orderCoins.rows.map((coin) => {
//             return coin.coin_id;
//         })
//         const coinsToQry = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIdsToFetch.join(',')}&order=gecko_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1d`);
//         const map = new Map();
//         dbCoinRes.rows.forEach(item => map.set(item.coin_id, item));
//         coinsToQry.data.forEach(item => map.set(item.id, {
//             ...map.get(item.id),
//             ...item
//         }));
//         let mergedData = Array.from(map.values());
//         mergedData = mergedData.sort((a, b) => (a.current_price < b.current_price) ? 1 : -1); // Sort by price DESC
//         // console.log('hopeful output', mergedData);
//         res.send(mergedData);
//     } else {
//         res.sendStatus(403)
//     }
// })
//   }
    