import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import assets from './assets.reducer';
import market from './market.reducer';
import details from './details.reducer';
import assetDetails from './assetDetails.reducer'
import total from './total.reducer';
import calculate from './calculate.reducer';
import orders from './orders.reducer';
import orderDetails from './orderDetails.reducer';
import global from './global.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  assets,
  market,
  details,
  assetDetails,
  total,
  calculate,
  orders,
  orderDetails,
  global
});

export default rootReducer;
