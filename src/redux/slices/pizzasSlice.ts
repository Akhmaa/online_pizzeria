import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";



type Pizza = {
    id: string;
    sizes: number[];
    title: string;
    types: number[];
    price: number;
    count: number;
    imageUrl: string;
}

enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

export type SearchPizzaParams = {
    category: string;
    search: string;
    sortBy: string;
    currentPage: string;

}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { category, search, sortBy, currentPage } = params
        const { data } = await axios.get(`https://634292c6ba4478d4783de561.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=asc${search}`);

        return data;
    }
)


const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });

        // extraReducers: {
        //     [fetchPizzas.pending]: (state) => {
        //         state.status = 'error';
        //         state.items = [];
        //     },
        //     [fetchPizzas.fulfilled]: (state, action) => {
        //         state.items = action.payload;
        //         state.status = 'success';
        //     },
        //     [fetchPizzas.rejected]: (state) => {
        //         state.status = 'error';
        //         state.items = [];
        //     }
        // }
    }
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;