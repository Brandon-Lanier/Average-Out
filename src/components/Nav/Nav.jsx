import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import logo from './logo.png'
import './Nav.css';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DropMenu from '../DropMenu/DropMenu'


function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor: '#364f6b'}}>
        <Toolbar>
          <img src={logo} alt="logo" id="logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }} id="logo-font">
            average out
          </Typography>
          <DropMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}



export default Nav;


{/* <div className="nav">
      <Link to="/portfolio">
        <img id="logo" src={logo} alt="logo" />
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
    //     {!user.id && (
    //       // If there's no user, show login/registration links
    //       <Link className="navLink" to="/login">
    //         Login / Register
    //       </Link>
    //     )}

    //     {/* If a user is logged in, show these links */}
    //     {user.id && (
    //       <>
    //         <Link className="navLink" to="/user">
    //           Home
    //         </Link>

    //         <Link className="portfolio" to="/portfolio">
    //           Portfolio
    //         </Link>

    //         <Link className="marketLink" to="/market">

    //           Market
    //         </Link>

    //         <Link className="navLink" to="/info">
    //           Info Page
    //         </Link>

    //         <LogOutButton className="navLink" />
    //       </>
    //     )}

    //     <Link className="navLink" to="/about">
    //       About
    //     </Link>
    //   </div>
    // </div> */}