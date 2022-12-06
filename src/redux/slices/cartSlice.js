import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartItems = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.items.push(action.payload);
    //   state.totalPrice = state.items.reduce((acc, obj) => obj.price + acc, 0);
    // },
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((acc, obj) => obj.price * obj.count + acc, 0);
    },
    decrement(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem.count > 0) {
        findItem.count--;
        state.totalPrice = state.items.reduce((acc, obj) => obj.price * obj.count + acc, 0);
      }
    },
    removeCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    removeItem(state, action) {
      state.items = action.payload;
      state.totalPrice = state.items.reduce((acc, obj) => obj.price * obj.count + acc, 0);
    },
  },
});

export const { addItem, removeCart, removeItem, decrement } = cartItems.actions;

export default cartItems.reducer;
