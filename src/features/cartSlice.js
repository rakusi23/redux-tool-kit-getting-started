import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { openModal } from "./modalSlice";
// import cartItems from "../cartItems";

const url = "https://course-api.com/react-useReducer-cart-projects";

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async(name, thunkAPI) => {
    try {
        // console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        const response = await axios(url);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue('something went wrong');
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            // return { cartItems: []};
        },
        removeItem: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount += 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount -= 1;
        },
        toggleCartItem: (state, {payload}) => {

        },
        calculateTotals: (state) => {
            const { cartItems } = state;
            let total = 0;
            let amount = 0;
            cartItems.forEach((item) => {
                amount += item.amount;
                total += item.price * item.amount;
            });
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
            state.isLoading = false;
        },
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        }
    }
});

export default cartSlice.reducer;
export const {clearCart, removeItem, increase, decrease, calculateTotals} = cartSlice.actions;