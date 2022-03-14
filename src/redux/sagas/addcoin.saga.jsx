import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';


function* addCoinSaga() {
    yield takeLatest('ADD_COIN', addCoin);
}

function* addCoin(action) {
    try {
        yield axios.post('/api/market', action.payload);
        yield put({type: 'GET_ASSETS'})
    } catch(error) {
        console.log('Error in addCoinSaga', err);
    }
}

export default addCoinSaga;