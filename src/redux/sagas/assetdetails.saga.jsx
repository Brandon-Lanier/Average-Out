import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getAssetsSaga() {
    yield takeLatest('GET_ASSET_DETAILs', getAssetDetails)
}

function* getAssetDetails(action) {
    try {
        const asset = yield axios.get(`/api/assets/details/${action.payload}`)
        yield put({type: 'SET_ASSET_DETAILS', payload: assets.data})
    } catch( error ) {
        console.log('Error in get Assets Saga', error);
    }
}

export default getAssetDetails;