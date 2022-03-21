import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { CardActions } from "@mui/material";
import { Button } from "@mui/material";

function OrderItem({order}) {

    const currentDate = new Date();
    const endDate = new Date(order?.end_date);
    const daysLeft = (endDate - currentDate) / (1000 * 60 * 60 * 24);
    let startDate = new Date(order?.start_date)
    startDate = startDate.toDateString()
    console.log(startDate);

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
                        (<li>{coin}</li>))}
                    </ul>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button size="medium">Delete</Button>
                    <Button size="medium">View</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default OrderItem;