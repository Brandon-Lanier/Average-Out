const priceHistory = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHART_DATA':
            return action.payload
        default:
            return state;
    }
}

export default priceHistory;