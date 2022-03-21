import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getOrdersSaga() {
    yield takeLatest('GET_ORDERS', getOrders);
    yield takeLatest('DELETE_ORDER', deleteOrder);
    yield takeLatest('GET_ORDER_DETAILS', getOrderDetails)
}

function* getOrders() {
    try {
        const orders = yield axios.get('/api/orders')
        yield put({type: 'SET_ORDERS', payload: orders.data})
    } catch( error ) {
        console.log('Error in the get orders saga', error);
    }
}

function* deleteOrder(action) {
    try {
        yield axios.delete(`/api/orders/${action.payload}`)
        yield put({type: 'GET_ORDERS'})
    }
    catch (error) {
        console.log('Error in the delete order saga', error);
    }
}

function* getOrderDetails(action) {
    try {
        const orderDetails = yield axios.get(`/api/orders/details/${action.payload}`);
        yield put({type: 'SET_ORDER_DETAILS', payload: orderDetails.data})
    }
    catch (error) {
        console.log('Error in get order details saga', error);
    }
}

export default getOrdersSaga;