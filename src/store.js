import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./features/cartSlice";
import modalReducer from "./features/modalSlice";

export const store = configureStore({
    reducer: {
        cart: carReducer,
        modal: modalReducer,
    },
});