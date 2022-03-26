import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LocalParkingOutlined, LogoutRounded } from '@mui/icons-material';

function DropMenu() {

        const history = useHistory();

        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
    
        const dispatch = useDispatch();

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        }
    
        const handleClose = () => {
            setAnchorEl(null);
        }
    
        const goPortfolio = () => {
            history.push('/portfolio');
            handleClose();
        }
    
        const goCalculations = () => {
            history.push('/active')
            handleClose();
        }
        
        const goAbout = () => {
            history.push('/about')
            handleClose();
        }

        const logOut = () => {
            history.push('/login')
            dispatch({ type: 'LOGOUT' }) 
        }

        return (
    
            <div>
    
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={goPortfolio}>Home</MenuItem>
                    <MenuItem onClick={goCalculations}>Active Strategies</MenuItem>
                    <MenuItem onClick={goAbout}>About</MenuItem>
                    <MenuItem onClick={logOut}>Log Out</MenuItem>
                </Menu>
            </div>
        )
    }

export default DropMenu;