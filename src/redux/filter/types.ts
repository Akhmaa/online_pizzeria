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