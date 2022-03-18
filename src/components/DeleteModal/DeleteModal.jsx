import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function DeleteModal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete all holdings of
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        This action cannot be undone!
                    </Typography>
                    <Button>Cancel</Button>
                    <Button>Delete</Button>
                </Box>
            </Modal>
        </div>

    )
}

export default DeleteModal.apply;