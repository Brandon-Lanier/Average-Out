import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import LineChart from '../LineChart/LineChart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography, Box, Slide, Grid, Divider, List, ListItem } from '@mui/material';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import EditModal from '../EditModal/EditModal';
import AddModal from '../AddModal/AddModal';
import './Details.css'



function Details() {

    const { coinid } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();


    // Reducer World //
    const assetDetails = useSelector(store => store.assetDetails[0]);
    const coinDetails = useSelector(store => store.details[0]);
    const chartData = useSelector(store => store.charts);
    

    useEffect(() => {
        dispatch({ type: 'GET_DETAILS', payload: coinid });
        dispatch({ type: 'GET_ASSET_DETAILS', payload: coinid })
    }, []);


    return (

        <Slide direction="up" in="open" mountOnEnter unmountOnExit>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <ChevronLeftIcon style={{ fontSize: 50 }} onClick={() => history.goBack()} />
                    </Grid>
                    <Grid item xs={6} sx={{ alignContent: 'center' }}>
                        <Typography variant="h6">
                            {coinDetails?.symbol.toUpperCase()}   |   {coinDetails?.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="h6">
                            Current Price: ${coinDetails ? (coinDetails?.current_price).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : 0}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {<img src={coinDetails?.image} width="40px" height="40px" />}
                    </Grid>
                    <Grid item xs={12}>
                        <LineChart
                            coinid={coinid}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="button">
                            You Own: {assetDetails ? parseFloat(assetDetails?.quantity) : 0} {coinDetails?.symbol.toUpperCase()}
                            <br></br>
                            Value: ${assetDetails ? (assetDetails?.quantity * coinDetails?.current_price).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <List>
                            <ListItem>
                                STATS:
                            </ListItem>
                            <Divider />
                            <ListItem>
                                % Change (24 hrs):
                                {coinDetails?.price_change_percentage_24h > 0 ? <ArrowDropUpRoundedIcon color="success" /> : <ArrowDropDownRoundedIcon color="error" />}
                                {coinDetails?.price_change_percentage_24h.toFixed(2)}%
                            </ListItem>
                            <Divider />
                            <ListItem>
                                Market Cap: ${coinDetails?.market_cap.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                24 Hour Low: ${coinDetails?.high_24h.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                            </ListItem>
                            <Divider />
                            <ListItem>
                                24 Hour Low: ${coinDetails?.low_24h.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <AddModal coinDetails={coinDetails} />
                    </Grid>
                    <Grid item justifyContent="center" xs={6}>
                        {Number(assetDetails?.quantity) > 0 && <EditModal assetDetails={assetDetails} coinDetails={coinDetails} />}
                    </Grid>
                </Grid>
            </Box>
        </Slide>

    )
}

export default Details;

