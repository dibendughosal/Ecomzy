import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from './Slices/CartSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    auth: authReducer
  },
});
