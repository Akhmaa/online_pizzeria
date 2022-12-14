import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLC";

import { CartItem, CartSliceState } from "./types";



const { totalPrice, items } = getCartFromLS()

const initialState: CartSliceState = {
    totalPrice,
    items
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload);

            if (findItem) {
                findItem.count--
                state.totalPrice = state.totalPrice - findItem.price;
            }

        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = 0;
            state.items.forEach(i => {
                const a = i.count * i.price;
                state.totalPrice += a;
            });

        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});




export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;

