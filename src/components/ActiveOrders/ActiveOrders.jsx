import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function ActiveOrders() {


    useEffect(() => {
        dispatch({ type: 'GET_ORDERS' })
    }, [])

    const dispatch = useDispatch();

    const orders = useSelector(store => store.orders)

    const currentDate = new Date();
    const endDate = new Date(orders[0]?.end_date);
    const daysLeft = (endDate - currentDate) / (1000 * 60 * 60 * 24);
    let startDate = orders[0]?.start_date

    console.log(daysLeft);
    console.log(endDate);
    console.log(currentDate);
    console.log(orders);
    return (
        <>
         <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                  Orders: {startDate}
                </Typography>
                <Typography variant="h5" component="div">
                   
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    
                </Typography>
                <Typography variant="body2">
                   Target Return: ${orders[0].total_target}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
            </Card>
        </>
    )
}

export default ActiveOrders;