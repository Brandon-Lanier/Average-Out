

const orderDetailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORDER_DETAILS':
            return action.payload
        default: 
            return state;
    }
}

export default orderDetailsReducer;