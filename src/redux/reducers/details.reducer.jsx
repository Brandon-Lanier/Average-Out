const detailsReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        case 'CLEAR_DETAILS':
            return state = '';
        default: 
            return state;
    }
}

export default detailsReducer;