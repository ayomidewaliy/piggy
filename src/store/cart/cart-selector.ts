import {AppState} from '../reducers';

export const selectCartItems = ({cartState}: AppState) => cartState.carts;
