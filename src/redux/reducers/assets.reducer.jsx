function assetsReducer(state = [], action) {
    switch(action.type) {
        case 'SET_ASSETS':
            return action.payload;
        default:
            return state;
    }
}

export default assetsReducer;

// for (let coin of state) {
//     for (let apicoin of action.payload) {
//         if (coin.coin_id === apicoin.id) {
//             ...coin.price = apicoin.current_price
//         }
//     }
// for (let i = 0; i < state.length; i++) {
//     for (let j = 0; j < action.payload.length; j++) {
//         if (state[i].coin_id === action.payload[j].id) {
//           [...state[i].current_price = action.payload[j].current_price];
//                 }
//             }
//             return state;
//         }


        


   // for (let coin of state) {
            //     if (coin.coin_id == action.payload.id) {
            //         return [...state, coin.price = action.payload.current_price]
            //     }
            // }