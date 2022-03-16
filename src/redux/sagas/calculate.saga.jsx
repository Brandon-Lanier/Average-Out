import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';


function* calculateSaga() {
   yield takeLatest('SEND_CALCULATION', calculate)
}

function* calculate(action) {
    try {
        const calcResults = yield axios.post('/api/calculate', action.payload);
        yield put({type: 'CALC_RESULTS', payload: calcResults})
    } 
    catch(error) {
        console.log('Error in the calculate Saga', error);
    }
}

export default calculateSaga;