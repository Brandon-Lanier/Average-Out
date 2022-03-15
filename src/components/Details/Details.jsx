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
import { Typography } from '@mui/material';
import { Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import './Details.css'


function Details() {

    const { coinid } = useParams();

    useEffect(() => {
        dispatch({ type: 'GET_DETAILS', payload: coinid });
        dispatch({type: 'GET_ASSET_DETAILS', payload: coinid})
    }, [])

    const dispatch = useDispatch();

    const history = useHistory();

    const [loading, setLoading] = useState(true);


    const assetDetails = useSelector(store => store.assetDetails[0]);
    const coinDetails = useSelector(store => store.details[0]);
    const chartData = useSelector(store => store.charts);

    console.log(assetDetails);

   const addCoin = () => {
        history.push(`/addcoin/${coinid}`)
   }

    return (
        
        <Slide direction="up" in="open" mountOnEnter unmountOnExit>
            <div className="details-container">
                <Box>
                <ChevronLeftIcon onClick={() => history.goBack()}/>
                <Typography variant="b1">
                    {coinDetails?.symbol.toUpperCase()}   |   {coinDetails?.name}
                </Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center', mt: 3}}>
                {<img src={coinDetails?.image} width="40px" height="40px"/>}
                <Typography variant="h6">
                    Current Price: ${coinDetails ? (coinDetails?.current_price).toLocaleString(undefined, {maximumFractionDigits:2}) : 0}
                </Typography>
                
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
                <br></br>
              
        
                <br></br>
                <Typography>
                    24 Percent Change 
                    {coinDetails?.price_change_percentage_24h.toFixed(2)}%
                </Typography>
                {/* Below Works but want to try updating pricing dynamically */}
                {/* <input type="number" value={coinQty} onChange={(e) => setCoinQty(e.target.value)} /> */}
                {/* <input type="text" value={coinQty} onChange={handleUpdate} /> */}
                <AddCircleIcon onClick={addCoin} />
            </div>
            </Slide>

    )
}

export default Details;