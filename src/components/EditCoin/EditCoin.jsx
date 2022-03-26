import { Container, Button, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import DeleteModal from '../DeleteModal/DeleteModal'


function EditCoin() {

    const { coinid } = useParams();
  
    useEffect(() => {
        dispatch({ type: 'GET_DETAILS', payload: coinid });
        dispatch({type: 'GET_ASSET_DETAILS', payload: coinid})
    }, [])

    const coin = useSelector(store => store.details[0]);
    const asset = useSelector(store => store.assetDetails[0])

    const history = useHistory();
    const dispatch = useDispatch();


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

   const handleDelete = () => {
       if(confirm('Are You Sure You Want To Delete This?')) {
        dispatch({type: 'DELETE_ALL_ASSET', payload: asset.id})
        history.push('/portfolio')
       }
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
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <img src={coin?.image} alt={coin?.name} height="60px" width="60px" />
            <Stack spacing={3}>
                <Typography variant="h6">
                    Lets edit your {coin?.name} holdings.
                </Typography>
                <Typography variant="b1">
                    Holdings: {asset?.quantity} {coin.symbol.toUpperCase()}
                </Typography>
                <Typography variant="b1">
                    Current Price: ${coin?.current_price} per coin.
                </Typography>
                <Typography variant="b1">
                    Total Value: ${(asset?.quantity * coin?.current_price).toFixed(2)}
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" startIcon={<Delete />} onClick={handleDelete}>Remove All</Button>
                    <Button variant="contained">Remove Amount</Button>
                </Stack>
            </Stack>



        </Container>

    )
}

export default EditCoin;