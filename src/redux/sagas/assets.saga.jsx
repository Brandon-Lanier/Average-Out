import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getAssetsSaga() {
    yield takeLatest('GET_ASSETS', getAssets)
}

function* getAssets() {
    try {
        const assets = yield axios.get('/api/assets')
        yield put({type: 'SET_ASSETS', payload: assets.data})
    } catch( error ) {
        console.log('Error in get Assets Saga', error);
    }
}

export default getAssetsSaga;