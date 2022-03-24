import axios from "axios";
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMarketSaga() {
    yield takeLatest('FETCH_MARKET', fetchMarket);
    yield takeLatest('FETCH_GLOBAL', fetchGlobal)
}

//Pulls all market data from coin gecko
function* fetchMarket() {
    try {
        const market = yield axios.get('/api/market');
        yield put({ type: 'SET_MARKET', payload: market.data })
    } catch (error) {
        console.log('Failed to get market data in market saga', error);
    }
}

function* fetchGlobal() {
    try {
        const global = yield axios.get('/api/market/global');
        yield put({ type: 'SET_GLOBAL', payload: global.data })
    } catch (error) {
        console.log('Error in fetchGlobal saga', error );
    }
}

export default fetchMarketSaga;