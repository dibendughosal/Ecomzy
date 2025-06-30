import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  }
});