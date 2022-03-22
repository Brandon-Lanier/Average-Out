import { Modal, Box, Stack, Typography, Button, TextField, InputAdornment, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Fade from '@mui/material/Fade';
import AddNestedModal from "../AddNestedModal/AddNestedModal";



function ExecuteModal({handleExecute, result}) {


    const history = useHistory();
    const dispatch = useDispatch();

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
        border: '3px solid #364f6b',
        boxShadow: 24,
        borderRadius: 5,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      };

    return (
        <div>
            <Button onClick={handleOpen} variant="contained">Execute Transaction</Button>
            <Fade in={open}>
                <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Execute"
                aria-describedby="execute-transaction"
            >
                <Box sx={style}>
                    <Stack spacing={2}>
                        
                        <Typography id="modal-modal-title" variant="h5">
                          Are you sure you would like to start this strategy?
                        </Typography>
                        <Divider variant="inset" />
                        <Typography variant="b1" sx={{ mt: 2 }}>
                          Starting this strategy means that you are selling your respective assets on an authorized exchange at the time of confirmation.  
                        </Typography>
                        <Divider variant="inset" />
                        <Typography variant="b1" sx={{ mt: 2 }}>
                         Average Out does not handle the actual selling of your assets, but the amounts will be removed from your current portfolio in this app.
                        </Typography>
                    </Stack>
                    <Stack spacing={2} sx={{mt: 2}}>
                    <Button variant ="contained" onClick={handleExecute}>Confirm</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
            </div>
            </Fade>
        </div>

        )
    }

    export default ExecuteModal;