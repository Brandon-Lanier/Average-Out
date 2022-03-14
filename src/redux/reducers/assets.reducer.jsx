function assetsReducer(state = [], action) {
    switch(action.type) {
        case 'SET_ASSETS':
            return action.payload;
        default:
            return state;
    }
}

export default assetsReducer;