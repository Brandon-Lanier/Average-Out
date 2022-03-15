import { Container } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function Calculate() {

    const assets = useSelector(store => store.assets)
    const market = useSelector(store => store.market)
    const assetDetails = useSelector(store => store.assetDetails)


    let filteredAssets = []
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'GET_ASSETS'})
    }, []);

  
    return (
        <div>
        {/* <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> */}
            <Typography variant="h5">
                How much would you like to sell?
            </Typography>
            
            {assets.map((coin) => (
                <p>value: {(coin.quantity * coin.current_price)}</p>
            ))}
            
        {/* </Container> */}
        </div>
    )
}

export default Calculate;