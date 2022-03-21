import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LineChart from '../LineChart/LineChart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography, Box, Slide, Button, Stack, Grid } from '@mui/material';
import AddModal from '../AddModal/AddModal';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import EditModal from '../EditModal/EditModal';

import './Details.css'


function Details() {

    const { coinid } = useParams();

    useEffect(() => {
        dispatch({ type: 'GET_DETAILS', payload: coinid });
        dispatch({ type: 'GET_ASSET_DETAILS', payload: coinid })
    }, []);

    const dispatch = useDispatch();

    const history = useHistory();

    const [loading, setLoading] = useState(true);

    const assetDetails = useSelector(store => store.assetDetails[0]);
    const coinDetails = useSelector(store => store.details[0]);
    const chartData = useSelector(store => store.charts);


    //    const addCoin = () => {
    //         history.push(`/addcoin/${coinid}`);
    //    }

    const handleEdit = () => {
        history.push(`/edit/${coinid}`);
    }



    return (

        <Slide direction="up" in="open" mountOnEnter unmountOnExit>
            {/* <Container maxWidthSm sx={{display: "flex", flexDirection: "column", alignContent: "space-between"}}> */}
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <ChevronLeftIcon style={{ fontSize: 50 }} onClick={() => history.goBack()} />
                    </Grid>
                    <Grid item xs={6} sx={{alignContent: 'center'}}>
                        <Typography variant="h6">
                            {coinDetails?.symbol.toUpperCase()}   |   {coinDetails?.name}
                        </Typography>
                    </Grid>
                    {/* <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '80%', alignItems: 'center', mt: 3}}> */}
                    <Grid item xs={9}>
                        <Typography variant="h6">
                            Current Price: ${coinDetails ? (coinDetails?.current_price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {<img src={coinDetails?.image} width="40px" height="40px" />}
                    </Grid>
                    {/* </Box> */}
                    <Grid item xs={12}>
                        <LineChart
                            coinid={coinid}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="b1">
                            You Own: {assetDetails ? parseFloat(assetDetails?.quantity) : 0} {coinDetails?.symbol.toUpperCase()}
                            <br></br>
                            Value: ${assetDetails ? (assetDetails?.quantity * coinDetails?.current_price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="b1">
                            % Change (24 hrs):
                            {coinDetails?.price_change_percentage_24h > 0 ? <ArrowDropUpRoundedIcon color="success" /> : <ArrowDropDownRoundedIcon color="error" />}
                            {coinDetails?.price_change_percentage_24h.toFixed(2)}%
                        </Typography>
                    </Grid>
                    <Grid item justifyContent="center" xs={12}>
                        {Number(assetDetails?.quantity) > 0 && <EditModal assetDetails={assetDetails} coinDetails={coinDetails} />}
                    </Grid>
                    <Grid item justifyContent="center" xs={12}>
                        {/* <Button variant="contained" onClick={addCoin}>Add</Button> */}
                        <AddModal coinDetails={coinDetails} />
                    </Grid>

                </Grid>
            </Box>
        </Slide>

    )
}

export default Details;




{/* {assetDetails?.quantity > 0 && <Button variant="outlined" onClick={handleEdit}>Edit Holdings</Button>} */}



