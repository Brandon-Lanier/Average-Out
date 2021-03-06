import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getAssetDetailsSaga() {
    yield takeLatest('GET_ASSET_DETAILS', getAssetDetails)
}

function* getAssetDetails(action) {
    try {
        console.log('in getDetails saga', action.payload);
        const asset = yield axios.get(`/api/assets/details/${action.payload}`)
        yield put({type: 'SET_ASSET_DETAILS', payload: asset.data})
    } catch( error ) {
        console.log('Error in get Assets Saga', error);
    }
}

export default getAssetDetailsSaga;