

function calculateReducer(state = '', action) {
    switch(action.type) {
        case 'CALC_RESULTS':
            return action.payload;
        default:
            return state;
    }
}

export default calculateReducer;