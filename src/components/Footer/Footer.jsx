import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CalculateIcon from '@mui/icons-material/Calculate';
import AddchartIcon from '@mui/icons-material/Addchart';
import PieChartIcon from '@mui/icons-material/PieChart';
import { useSelector } from 'react-redux';



function Footer() {

    const history = useHistory();
    const user = useSelector(store => store.user);

    
    const goMarket = () => {
        history.push('/market')
    }

    
    const goPortfolio = () => {
        history.push('/portfolio')
    }

   
    const goCalculate = () => {
        history.push('/scenarios')
    }

    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <Paper sx={{
                position: 'fixed', bottom: 0, left: 0, right: 0 , backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff'}} elevation={5}>
                 {user.id && <BottomNavigation showLabels style={{background: '#364f6b',}}
                >  
                    <BottomNavigationAction sx={{color: '#fff'}} label="Market" icon={<AddchartIcon />} onClick={goMarket} />
                    <BottomNavigationAction sx={{color: '#fff'}} label="Portfolio" icon={<PieChartIcon />} onClick={goPortfolio} />
                    <BottomNavigationAction sx={{color: '#fff'}} label="Strategies" icon={<CalculateIcon />} onClick={goCalculate} />
                    
                </BottomNavigation>
                }
            </Paper>
        </Box>

    )
}

export default Footer;
