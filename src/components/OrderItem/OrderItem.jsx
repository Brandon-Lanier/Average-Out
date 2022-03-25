import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import { Modal, Stack, Box, Fade } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DeleteOrderModal from "../DeleteOrderModal/DeleteOrderModal";
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionActions, Button } from '@mui/material';

function OrderItem({ order }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const history = useHistory();
    const dispatch = useDispatch();

    // Grab the current date
    const currentDate = new Date();
    
    // End date in JS format
    const endDate = new Date(order?.end_date);

    // Handles calculation of days remaining in a readable format
    const daysLeft = (endDate - currentDate) / (1000 * 60 * 60 * 24); 

    // Date the strategy began in a readable format for user
    let startDate = new Date(order?.start_date)
    startDate = startDate.toDateString()

    // Fetching the currently selected order from DB and API info
    const handleView = () => {
        console.log(order.id);
        dispatch({ type: 'GET_ORDER_DETAILS', payload: order.id })
        history.push(`/orders/details/${order.id}`)
    }

    return (
        <>
            <Accordion elevation={6} sx={{mt: 3}} >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{backgroundColor: '#47688d', color: '#fff', textAlign: 'center'}}
                >
                    <Stack spacing={1}>
                <Typography variant="h5" gutterBottom>
                        {startDate}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Target Return: ${order.total_target}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>

                    </Typography>
                    <Typography variant="h5">
                        {Math.floor(daysLeft)} Days left
                    </Typography>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                <Box>
                        <Typography variant="b1">
                            Selected Assets:
                        </Typography>
                        <List>
                            {order.coins.map(coin =>
                            (<><ListItem disablePadding
                                key={coin}>
                                {coin}
                            </ListItem><Divider /></>))}
                        </List>
                    </Box>
        </AccordionDetails>
        <AccordionActions>
        <DeleteOrderModal
                        order={order}
                    />
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon />}
                        onClick={handleView}
                        sx={{ m: '5px' }}
                    >View
                    </Button>
        </AccordionActions>
      </Accordion>




            {/* <Card elevation={4} sx={{ mt: 2}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Start Date: {startDate}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Target Return: ${order.total_target}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }}>

                    </Typography>
                    <Typography variant="b1">
                        Days Remaining: {Math.floor(daysLeft)}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="b1">
                            Selected Assets:
                        </Typography>
                        <List>
                            {order.coins.map(coin =>
                            (<><ListItem disablePadding
                                key={coin}>
                                {coin}
                            </ListItem><Divider /></>))}
                        </List>
                    </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <DeleteOrderModal
                        order={order}
                    />
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon />}
                        onClick={handleView}
                        sx={{ m: '5px' }}
                    >View
                    </Button>
                </CardActions>
            </Card> */}
        </>
    )
}

export default OrderItem;