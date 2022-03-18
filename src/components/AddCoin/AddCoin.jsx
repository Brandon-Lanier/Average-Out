import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Box, Typography, TextField, Stack, Container } from '@mui/material';
import Modal from '@mui/material/Modal';

function AddCoin() {

    // const [coinQty, setCoinQty] = useState('')
    // const [coinId, setCoinId] = useState('')
    // const [dollarAmount, setDollarAmount] = useState('');
    // const [value, setValue] = useState('')
    const { coinid } = useParams();

    useEffect(() => {
        dispatch({type: 'GET_ASSET_DETAIlS', payload: coinid})
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
    const addCoin = () => {
        console.log(coin);
        if (confirm(`Add ${quantity} ${coin.name} for a current value of $${dollarAmount}?`)) {
            dispatch({ type: 'ADD_COIN', payload: { coin: coin, quantity: quantity } })
            alert('Coin Added to portfolio');
            dispatch({ type: 'CLEAR_DETAILS' })
            history.push('/market')
        }
    }


    return (
        <Container>
            <h2>Add {coin?.name} to your portfolio!</h2>
            <p>Amount to purchase</p>
            <input type='number' value={quantity} onChange={handleUpdate} />
            <p>Market Value: ${(Number(dollarAmount.toFixed(2)))}</p>
            <button onClick={addCoin}>Add Coin</button>

        </Container>

    )
}

export default AddCoin;










//     return (
{/* <div>
    <Button onClick={handleOpen} variant="contained">Add Coin</Button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Stack spacing={2}>

                <Typography id="modal-modal-title" variant="h6">
                    How Much {coinDetails.name} would you like to add?
                </Typography>
                <Typography id="current_price" variant="h6">
                    Current Price: ${coin.current_price.toFixed(2)}
                </Typography>
                <TextField variant="outlined" type="number" value={quantity} onChange={handleUpdate} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Market Value: ${(Number(dollarAmount.toFixed(2)))}
                </Typography>
            </Stack>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={addCoin}>Add Holdings</Button>
        </Box>
    </Modal>
</div > */}

//     )
// }








// <Container>
// <h2>Add {coin?.name} to your portfolio!</h2>
// <p>Amount to purchase</p>
// <input type='number' value={quantity} onChange={handleUpdate} />
// <p>Market Value: ${(Number(dollarAmount.toFixed(2)))}</p>
// <button onClick={addCoin}>Add Coin</button>

// </Container> 

// // <div>
// //     <h2>Add {coin.name} to your portfolio!</h2>
// //     <p>Amount to purchase</p>
// //     <input type='number' value={quantity} onChange={handleUpdate} />
// //     <p>Market Value: ${(Number(dollarAmount.toFixed(2)))}</p>
// //     <button onClick={addCoin}>Add Coin</button>

// // </div>

// //     <div>
// //     <Button variant="contained" onClick={handleClickOpen} />
// //     <Dialog open={open} onClose={handleClose}>
// //         <Container sx={{ display: 'flex', justifyContent: 'center' }}>
// //             <Paper
// //                 elevation={12}
// //                 sx={{
// //                     display: 'flex',
// //                     flexDirection: 'column',
// //                     justifyContent: 'space-between',
// //                     width: '400px',
// //                     p: '10px',
// //                 }}
// //             >
// //                 <DialogTitle>Add </DialogTitle>
// //                 <DialogContent>
// //                     {/* <img src={coin.image} width="60px" height="60px" /> */}
// //                     <Typography variant="h6">
// //                         Current Value: ${coin.current_price}
// //                     </Typography>
// //                     <Typography variant="h6">
// //                         Ticker: {coin.symbol}
// //                     </Typography>
// //                     <FormControl sx={{ width: '50%' }}>
// //                         <TextField
// //                             sx={{ margin: '10px' }}
// //                             type="number"
// //                             label="Quantity to Add"
// //                             required
// //                             value={quantity}
// //                             onChange={handleUpdate}
// //                         />
// //                     </FormControl>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <Button
// //                         sx={{ margin: '10px' }}
// //                         variant="outlined"
// //                         color="primary"
// //                         onClick={handleClose}
// //                     >
// //                         <Typography variant="h6">Cancel</Typography>
// //                     </Button>
// //                     <Button
// //                         variant="contained"
// //                         onClick={addCoin}
// //                         sx={{ margin: '10px' }}
// //                         >
// //                         <Typography variant="h6">Add Coin</Typography>
// //                     </Button>
// //                 </DialogActions>
// //             </Paper>
// //         </Container>
// //     </Dialog>
// // </div>