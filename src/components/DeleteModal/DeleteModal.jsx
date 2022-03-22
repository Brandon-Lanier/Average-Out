import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";


function DeleteModal({ assetDetails, coinDetails }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch({ type: 'DELETE_ALL_ASSET', payload: assetDetails?.id })
        history.push('/portfolio')
    }

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
            <Button onClick={handleOpen} fullWidth variant="contained">Remove All</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        Are you sure you want to delete all holdings of {coinDetails?.name}
                    </Typography>
                    <Typography sx={{ mt: 2, mb: 2 }} variant="h6">
                        This action cannot be undone!
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button onClick={handleClose} variant="outlined">Cancel</Button>
                        <Button onClick={handleDelete} variant="contained">Delete</Button>
                    </Box>
                </Box>
            </Modal>
        </div>

    )
}

export default DeleteModal;