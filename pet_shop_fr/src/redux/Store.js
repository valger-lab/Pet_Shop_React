import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import discountReducer from "./discountSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    discount: discountReducer,
  },
});
