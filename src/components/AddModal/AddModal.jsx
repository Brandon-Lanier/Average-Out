import { Modal, Box, Stack, Typography, Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Fade from '@mui/material/Fade';


function AddModal({coinDetails}) {


    const history = useHistory();
    const dispatch = useDispatch();

    // Setting the input and dynamic dollar changing amounts
    const [quantity, setQuantity] = useState(0);
    const [dollarAmount, setDollarAmount] = useState(0)

    const handleUpdate = (e) => {
        setQuantity(e.target.value);
        setDollarAmount(e.target.value * coinDetails?.current_price)
        console.log(quantity, dollarAmount);
    }

    // Sending the coin and quantity to a Saga to handle post to DB.
    const addCoin = () => {
        console.log(coinDetails);
        if (confirm(`Add ${quantity} ${coinDetails?.name} for a current value of $${dollarAmount}?`)) {
            dispatch({ type: 'ADD_COIN', payload: { coin: coinDetails, quantity: quantity } })
            alert('Coin Added to portfolio');
            dispatch({ type: 'CLEAR_DETAILS' })
            history.push('/market')
        }
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        bgcolor: '#f5f5f5',
        border: '1px solid #47688d',
        boxShadow: 24,
        borderRadius: 5,
        p: 4,
      };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Add Coin</Button>
            <Fade in={open}>
                <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        <img src={coinDetails?.image} alt="Coin Logo" width="60px" height="60px" />
                        <Typography id="modal-modal-title" variant="h6">
                            How Much {coinDetails?.name} would you like to add?
                        </Typography>
                        <Typography id="current_price" variant="h6">
                            Current Price: ${coinDetails?.current_price.toFixed(2)}
                        </Typography>
                        <TextField variant="outlined" type="number" value={quantity} onChange={handleUpdate} />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Market Value: ${(Number(dollarAmount.toFixed(2)))}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={5} sx={{mt: 2}}>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={addCoin}>Add Holdings</Button>
                    </Stack>
                </Box>
            </Modal>
            </div>
            </Fade>
        </div>

        )
    }

    export default AddModal;