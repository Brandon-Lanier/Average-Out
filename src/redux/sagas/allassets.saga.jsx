// import axios from 'axios';
// import { put, takeLatest} from 'redux-saga/effects';

// function* getAllAssetDetailsSaga() {
//     yield takeLatest('GET_ALL_ASSET_DETAILS', getAllAssetDetails)
// }

// function* getAllAssetDetails(action) {
//     try {
//         console.log('in getDetails saga', action.payload);
//         const asset = yield axios.get(`/api/assets/details/${action.payload}`)
//         yield put({type: 'SET_ALL_ASSET_DETAILS', payload: asset.data})
//     } catch( error ) {
//         console.log('Error in get Assets Saga', error);
//     }
// }

// export default getAllAssetDetailsSaga;