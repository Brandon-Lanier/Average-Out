
const totalReducer = (state = 0, action) => {
    switch (action.type) {
        case 'ADD_VALUE':
            return state + action.payload;
        case 'CLEAR_TOTAL':
            return state = 0
        default: 
            return state;
    }
}

export default totalReducer;