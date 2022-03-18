import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getOrdersSaga() {
    yield takeLatest('GET_ORDERS', getOrders)
}

function* getOrders() {
    try {
        const orders = yield axios.get('/api/orders')
        yield put({type: 'SET_ORDERS', payload: orders.data})
    } catch( error ) {
        console.log('Error in the get orders saga', error);
    }
}

export default getOrdersSaga;