import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getDetails(action) {
    try{
        const details = yield axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${action.payload}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        yield put({type: 'SET_DETAILS', payload: details.data})
    }   catch(error) {
        console.log('Error in get details saga', error);
    } 
}

function* getDetailsSaga() {
    yield takeLatest('GET_DETAILS', getDetails)
}

export default getDetailsSaga;