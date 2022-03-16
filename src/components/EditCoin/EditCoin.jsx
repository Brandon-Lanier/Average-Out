import { Container, Button, TextField, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";




function EditCoin() {

    const { coinid } = useParams();

    useEffect(() => {
        dispatch({ type: 'GET_ASSET_DETAIlS', payload: coinid })
        dispatch({ type: 'GET_DETAILS', payload: coinid })
    }, [])

    const coin = useSelector(store => store.details[0]);
    const asset = useSelector(store => store.assetDetails[0])

    const history = useHistory();
    const dispatch = useDispatch();

    // Setting the input and dynamic dollar changing amounts
    const [quantity, setQuantity] = useState(0);
    const [dollarAmount, setDollarAmount] = useState(0)



    // On change of the input field, the state of quantity is updated and the total value is updated.
    const handleUpdate = (e) => {
        setQuantity(e.target.value);
        setDollarAmount(e.target.value * coin.current_price)
        console.log(quantity, dollarAmount);
    }

    // Sending the coin and quantity to a Saga to handle post to DB.


    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <img src={coin?.image} alt={coin.name} height="60px" width="60px" />
            <Stack spacing={3}>
                <Typography variant="h6">
                    Lets edit your {coin?.name} holdings.
                </Typography>
                <Typography variant="b1">
                    Holdings: {asset.quantity} {coin.symbol.toUpperCase()}
                </Typography>
                <Typography variant="b1">
                    Current Price: ${coin.current_price} per coin.
                </Typography>
                <Typography variant="b1">
                    Total Value: ${(asset.quantity * coin.current_price).toFixed(2)}
                </Typography>
                <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<Delete />}>Remove All</Button>
                <Button variant="contained">Remove Amount</Button>
                </Stack>
            </Stack>
            
                
          
        </Container>

    )
}

export default EditCoin;