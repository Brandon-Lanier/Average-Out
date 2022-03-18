import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function DropMenu() {

        const history = useHistory();

        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
    
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        }
    
        const handleClose = () => {
            setAnchorEl(null);
        }
    
        const goProfile = () => {
            history.push('/profile');
            handleClose();
        }
    
        const goCalculations = () => {
            history.push('/active')
            handleClose();
        }
    
        const goHistory = () => {
            history.push('/history')
        }
        
        const goAbout = () => {
            history.push('/about')
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
                    <MenuItem onClick={goProfile}>Home</MenuItem>
                    <MenuItem onClick={goCalculations}>Active Strategies</MenuItem>
                    <MenuItem onClick={goHistory}>History</MenuItem>
                    <MenuItem onClick={goAbout}>About</MenuItem>
                </Menu>
            </div>
        )
    }

export default DropMenu;