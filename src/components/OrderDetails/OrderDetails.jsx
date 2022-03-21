import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



function OrderDetails() {

    const { orderid } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: 'GET_ORDER_DETAIlS', payload: orderid })
    })

    const order = useSelector(store => store.orderDetails)

    return (
        <p>{order.id}</p>
    )
}

export default OrderDetails;