import { Modal, Box, Stack, Typography, Button, TextField, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';



function AddNestedModal({ coinDetails, quantity }) {


    const history = useHistory();
    const dispatch = useDispatch();


    const addCoin = () => {
        dispatch({ type: 'ADD_COIN', payload: { coin: coinDetails, quantity: quantity } })
        setAlertOpen(true)
        dispatch({ type: 'CLEAR_DETAILS' })
        history.push('/portfolio')

    }

    const [alertOpen, setAlertOpen] = useState(false)

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
            <Button onClick={handleOpen} variant="contained" fullWidth>Add</Button>
            <Fade in={open}>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="Confirm-Add"
                        aria-describedby="Confirm-Add"
                    >
                        <Box sx={style}>
                            <Stack spacing={2}>
                                <img src={coinDetails?.image} alt="Coin Logo" width="60px" height="60px" />
                                <Typography id="modal-modal-title" variant="h6">
                                    Add {quantity} {coinDetails?.name} to your portfolio?
                                </Typography>
                            </Stack>
                            <Stack spacing={2} sx={{ mt: 2 }}>
                                <Button variant="contained" onClick={addCoin}>Add</Button>
                                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                            </Stack>
                        </Box>

                    </Modal>
                    
                </div>
            </Fade>
        </div>

    )
}

export default AddNestedModal;