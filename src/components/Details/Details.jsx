import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LineChart from '../LineChart/LineChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box } from '@mui/material';
import { Typography, Container } from '@mui/material';
import { Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import AddCoin from '../AddCoin/AddCoin';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import Stack from '@mui/material/Stack';
import './Details.css'


function Details() {

    const { coinid } = useParams();

    useEffect(() => {
        dispatch({ type: 'GET_DETAILS', payload: coinid });
        dispatch({type: 'GET_ASSET_DETAILS', payload: coinid})
    }, []);

    const dispatch = useDispatch();

    const history = useHistory();

    const [loading, setLoading] = useState(true);

    const assetDetails = useSelector(store => store.assetDetails[0]);
    const coinDetails = useSelector(store => store.details[0]);
    const chartData = useSelector(store => store.charts);

   
   const addCoin = () => {
        history.push(`/addcoin/${coinid}`);
   }

   const handleEdit = () => {
       history.push(`/edit/${coinid}`);
   }

    return (
        
        <Slide direction="up" in="open" mountOnEnter unmountOnExit>
            {/* <Container maxWidthSm sx={{display: "flex", flexDirection: "column", alignContent: "space-between"}}> */}
            <div className="details-container">
            
                <ChevronLeftIcon onClick={() => history.goBack()}/>
                <Typography variant="b1">
                    {coinDetails?.symbol.toUpperCase()}   |   {coinDetails?.name}
                </Typography>
                
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '80%', alignItems: 'center', mt: 3}}>
                <Typography variant="h6">
                    Current Price: ${coinDetails ? (coinDetails?.current_price).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}
                </Typography>
                {<img src={coinDetails?.image} width="40px" height="40px"/>}
                </Box>
                <LineChart
                    coinid={coinid}
                />
                <Box>
                <Typography>
                    You Own: {assetDetails ? parseFloat(assetDetails?.quantity) : 0} {coinDetails?.symbol.toUpperCase()} 
                    <br></br>
                    Value: ${assetDetails ? (assetDetails?.quantity * coinDetails?.current_price).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}
                </Typography>
                </Box>
                <Typography>
                    % Change (24 hrs):
                    {coinDetails?.price_change_percentage_24h > 0 ? <ArrowDropUpRoundedIcon /> : <ArrowDropDownRoundedIcon /> }
                    {coinDetails?.price_change_percentage_24h.toFixed(2)}%
                </Typography>
            
                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" onClick={handleEdit}>Edit</Button>
                    <Button variant="contained" onClick={addCoin}>Add</Button>

                </Stack>
                
                {/* </Container> */}
                </div>
            </Slide>

    )
}

export default Details;