import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";
import { Modal, Stack, Box, Fade } from "@mui/material";
import { useState } from "react";
import DeleteOrderModal from "../DeleteOrderModal/DeleteOrderModal";


function OrderItem({order}) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const currentDate = new Date();
    const endDate = new Date(order?.end_date);
    const daysLeft = (endDate - currentDate) / (1000 * 60 * 60 * 24);
    let startDate = new Date(order?.start_date)
    startDate = startDate.toDateString()
    console.log(startDate);

    const handleDelete = () => {
        console.log('delete');
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant ="h5" color="text.primary" gutterBottom>
                        Start Date: {startDate}
                    </Typography>
                    <Typography variant="h5" component="div">
                        Target Return: ${order.total_target}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">

                    </Typography>
                    <Typography variant="body2">
                        Days Remaining: {Math.floor(daysLeft)}
                    </Typography>
                    <ul>
                    {order.coins.map(coin => 
                        (<li key={coin}>
                            {coin}
                        </li>))}
                    </ul>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <DeleteOrderModal order={order} />
                    <Button size="medium">View</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default OrderItem;