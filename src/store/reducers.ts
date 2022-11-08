import {combineReducers} from 'redux';
import cartState from './cart/cart-slice';

const appReducers = combineReducers({
  cartState,
});

export type AppState = ReturnType<typeof appReducers>;

export default appReducers;
