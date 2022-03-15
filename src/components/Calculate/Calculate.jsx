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

    const [availableAssets, setAvailableAssets] = useState([]);

    let filteredAssets = []
    
    const dispatch = useDispatch();

    useEffect(() => {
        function getAssets() {
            for (let coin of assets) {
            let filtered = market.filter((el) => el.id == coin.coin_id)
                // setAvailableAssets([...availableAssets, filtered[0]])
                filteredAssets.push(filtered[0])
            // this works but try saving it to local state!
            // dispatch({type: 'SET_ASSET_DETAILS', payload: filtered[0] })
            }
        }getAssets()
    }, []) 

    console.log(availableAssets);
    return (
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant="h5">
                How much would you like to sell?
            </Typography>
                

          
        </Container>
    )
}

export default Calculate;