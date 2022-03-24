import { Modal, Box, Stack, Typography, Button, TextField, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';




function DeleteOrderModal({order}) {


    const history = useHistory();
    const dispatch = useDispatch();


    const handleDelete = () => {
        dispatch({type: 'DELETE_ORDER', payload: order.id})
        history.push('/portfolio')
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px'
        
    };

    return (
        <div>
            <Button onClick={handleOpen} 
                variant="contained" 
                size="medium" 
                color="primary"
                startIcon={<DeleteIcon />}>
                    Delete
            </Button>
            <Fade in={open}>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="Confirm-Delete"
                        aria-describedby="Confirm-Delete"
                    >
                        <Box sx={style}>
                                
                                <Typography id="Delete" variant="h6" sx={{textAlign: 'center'}}>
                                    Are you sure you would like to remove this calculation?
                                </Typography>
                                <Typography variant="b1">
                                    This action is not reversible!
                                </Typography>
                            <Stack spacing={2} sx={{ mt: 2 }}>
                                <Button variant="contained" onClick={handleDelete} fullWidth>Remove</Button>
                                <Button variant="outlined" onClick={handleClose} fullWidth>Cancel</Button>
                            </Stack>
                        </Box>

                    </Modal>
                    
                </div>
            </Fade>
        </div>

    )
}

export default DeleteOrderModal;