import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './UserPage.css'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const global = useSelector(store => store.global);
  const assets = useSelector(store => store.assets)
  const market = useSelector(store => store.market)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_GLOBAL' })
    dispatch({ type: 'GET_ASSETS' })
    dispatch({ type: 'FETCH_MARKET' })
  }, [dispatch]);

  const totalMarket = () => {
    let values = Object.values(global?.total_market_cap);
    let sum = values.reduce((a, b) => a + b)
    sum = sum.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    return sum;
  }

  const totalVolume = () => {
    let values = Object.values(global?.total_volume)
    let sum = values.reduce((a, b) => a + b);
    sum = sum.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })
    return sum;
  }

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  let totalValue = [];
  
  const getSum = () => {
    let runningTotal = 0
    for (let coin of assets) {
      runningTotal = coin.quantity * coin.current_price;
      totalValue.push(runningTotal)
    }
    totalValue = totalValue.reduce((a, b) => a + b, 0);
    return totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }



  return (

    <>
      {global.length === 0 || assets.length === 0 || market.length === 0 ?
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        :
        <div id="user-container">
          <Typography variant="h5">Welcome, {user.firstname}!</Typography>
          <Button variant="contained">Go To Portfolio</Button>
          <p>Current Market Data:</p>
          <p>Portfolio Total: ${getSum()}</p>
          <p>Total Coins: {global?.active_cryptocurrencies} </p>
          <p>${totalMarket()}</p>
          <p>${totalVolume()}</p>
          <Typography>
            24 Hour Change:{global?.market_cap_change_percentage_24h_usd > 0 ? <ArrowDropUpRoundedIcon color="success" /> : <ArrowDropDownRoundedIcon color="error" />}
            {global?.market_cap_change_percentage_24h_usd.toFixed(2)}
          </Typography>
          {/* <LogOutButton className="btn" /> */}
        </div>
      }
    </>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
