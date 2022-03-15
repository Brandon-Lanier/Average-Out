import axios from "axios";
import { put, takeLatest} from 'redux-saga/effects';

function* fetchMarketSaga() {
    yield takeLatest('FETCH_MARKET', fetchMarket);
}

//Pulls all market data from coin gecko
function* fetchMarket() {
    try {
        const market = yield axios.get('/api/market');
        yield put({type: 'SET_MARKET', payload: market.data})
        yield put({type: 'MATCH_ASSETS', payload: market.data})
    } catch (error) {
        console.log('Failed to get market data in market saga', error);
    }
}

export default fetchMarketSaga;