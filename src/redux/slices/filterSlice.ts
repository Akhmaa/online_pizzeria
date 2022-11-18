import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
    RATING = 'rating',
    TITLE = 'title',
    PRICE = 'price',
}

export type SortPopup = {
    name: string;
    sortProperty: SortPropertyEnum;
}

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: SortPopup;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.RATING
    }
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<SortPopup>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
        }

    }
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
