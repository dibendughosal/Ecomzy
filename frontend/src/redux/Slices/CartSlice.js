import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      const index = state.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state[index].quantity += (action.payload.quantity || 1);
      } else {
        state.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    remove: (state, action) => {
      return state.filter(item => item._id !== action.payload);
    },
    decrementQty: (state, action) => {
      const index = state.findIndex(item => item._id === action.payload);
      if (index !== -1 && state[index].quantity > 1) {
        state[index].quantity -= 1;
      }
    },
    clearCart: () => [],
  },
});

export const { add, remove, clearCart, decrementQty } = cartSlice.actions;
export default cartSlice.reducer;
