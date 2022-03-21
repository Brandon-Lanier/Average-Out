import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getOrdersSaga() {
    yield takeLatest('GET_ORDERS', getOrders);
    yield takeLatest('DELETE_ORDER', deleteOrder)
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

export default getOrdersSaga;