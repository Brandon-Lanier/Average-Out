import { Modal, Box, Stack, Typography, Button, TextField, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Fade from '@mui/material/Fade';
import DeleteModal from "../DeleteModal/DeleteModal";

function EditModal({coinDetails, assetDetails}) {

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
        border: '1px solid #47688d',
        boxShadow: 24,
        borderRadius: 5,
        p: 4,
      };

      const handleDelete = () => {
        if(confirm('Are You Sure You Want To Delete This?')) {
         dispatch({type: 'DELETE_ALL_ASSET', payload: assetDetails.id})
         history.push('/portfolio')
        }
    }

    const handleRemove = () => {
        console.log('removed');
    }
    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" color="primary">Edit Holdings</Button>
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
                            Let's edit your {coinDetails?.name} holdings.
                        </Typography>
                        <Typography id="current_price" variant="b1">
                            Quantity Owned: {assetDetails?.quantity}
                        </Typography>
                        <Typography variant="b1" sx={{ mt: 2 }}>
                            Current Value: ${(assetDetails?.quantity * coinDetails?.current_price).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </Typography>
                    </Stack>
                    <Stack spacing={2} sx={{mt: 2}}>
                    <DeleteModal assetDetails={assetDetails} coinDetails={coinDetails}/>
                    <Button variant="contained" onClick={handleRemove}>Remove Amount</Button>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
            </div>
            </Fade>
        </div>

        )
    }

export default EditModal;