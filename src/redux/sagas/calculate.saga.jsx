import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';


function* calculateSaga() {
   yield takeLatest('SEND_CALCULATION', calculate);
   yield takeLatest('EXECUTE_CALCULATION', executeCalc)
}

function* calculate(action) {
    try {
        const calcResults = yield axios.post('/api/calculate', action.payload);
        yield put({type: 'SET_RESULT', payload: calcResults.data})
    } 
    catch(error) {
        console.log('Error in the calculate Saga', error);
    }
}

function* executeCalc(action) {
    try {
        yield axios.post('/api/calculate/save', action.payload) // add the calculation to DB.
        yield axios.put('/api/assets/calc', action.payload) //Remove the calculated assets from the DB
        yield put({type: 'GET_ASSETS'}) // Fetch the updated assets
    }
    catch(error) {
        console.log('Error in calculate saga for execute calc', error);
    }
}

export default calculateSaga;