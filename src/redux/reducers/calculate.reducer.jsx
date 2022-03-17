

function calculateReducer(state = [], action) {
    switch(action.type) {
        case 'SET_RESULT':
            return action.payload;
        case 'CLEAR_RESULT':
            return state = [];
        default:
            return state;
    }
}

export default calculateReducer;