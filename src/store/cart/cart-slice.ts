import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  price: number;
  meal: string;
  quantity: number;
  size: string;
  imgUri: string;
}

interface CartState {
  carts: CartItem[];
}

const initialState = {carts: []} as CartState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => ({
      ...state,
      carts: [...action.payload],
    }),
  },
});

export const {setCartItems} = cartSlice.actions;
export default cartSlice.reducer;
