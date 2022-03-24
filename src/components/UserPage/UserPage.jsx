import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import './UserPage.css'

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  
  return (
    <div id="user-container">
      <Typography variant="h5">Welcome, {user.firstname}!</Typography>
      <Button variant="contained">Go To Portfolio</Button>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
