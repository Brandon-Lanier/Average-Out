const globalReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GLOBAL':
        return action.payload;
        default: 
            return state;
    }
}

export default globalReducer;