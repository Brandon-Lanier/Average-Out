function assetDetailsReducer(state = [], action) {
    switch(action.type) {
        case 'SET_ASSET_DETAILS':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default assetDetailsReducer;