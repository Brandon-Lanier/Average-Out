import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* deleteAssetsSaga() {
    takeLatest('DELETE_ALL_ASSET', deleteAsset)
}

function* deleteAsset(action) {
    try {
        console.log(action.payload);
        yield axios.delete(`/api/assets/${action.payload}`);
        yield put({type: 'GET_ASSETS'})
    } catch (error) {
        console.log('Error in delete asset saga', error);
    }
}

export default deleteAssetsSaga;