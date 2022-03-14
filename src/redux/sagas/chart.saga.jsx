import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getChartSaga() {
    yield takeLatest('GET_CHART_DATA', getChart)
}

function* getChart(action) {
    try {
        const chartData = yield axios.get(`https://api.coingecko.com/api/v3/coins/${action.payload}/market_chart?vs_currency=usd&days=30&interval=daily`);
        yield put({type: 'SET_CHART_DATA', payload: chartData.data.prices})
    } catch( error ) {
        console.log('Error in getAssets Saga', error);
    }
}

export default getChartSaga;