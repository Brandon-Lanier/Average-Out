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
import OrderItem from "../OrderItem/OrderItem";
import GilroyBold from '../fonts/Gilroy-Bold.ttf'
import './ActiveOrders.css'


function ActiveOrders() {


    useEffect(() => {
        dispatch({ type: 'GET_ORDERS' })
    }, [])

    const dispatch = useDispatch();

    const orders = useSelector(store => store.orders)




    return (
        <>
            <div className="activeOrders">
                {orders.map(order => (
                    <OrderItem
                        key={order.id}
                        order={order}
                    />
                ))}
            </div>
        </>
    )
}

export default ActiveOrders;