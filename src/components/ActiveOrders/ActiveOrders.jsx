import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


function ActiveOrders() {

    const dispatch = useDispatch();

    const orders = useSelector(store => store.orders)

    useEffect(() => {
        dispatch({ type: 'GET_ORDERS' })
    }, [])

    const currentDate = new Date();
    const endDate = new Date(orders[0].end_date);
    const daysLeft = (endDate - currentDate) / (1000*60*60*24);
  
    console.log(daysLeft);
    console.log(endDate);
    console.log(currentDate);
    return (
        <div>
            <p>Active Orders!</p>
            {orders?.map((order) => (
            <p>{order.coins.map(coin => (
                <p>{coin}</p>
            ))}</p>
        ))}
         <p>Days Remaining: {Math.floor(daysLeft)}</p>

        </div>

    )
}

export default ActiveOrders;