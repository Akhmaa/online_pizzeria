export type Pizza = {
    id: string;
    sizes: number[];
    title: string;
    types: number[];
    price: number;
    count: number;
    imageUrl: string;
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface PizzaSliceState {
    items: Pizza[];
    status: Status;
}


export type SearchPizzaParams = {
    category: string;
    search: string;
    sortBy: string;
    currentPage: string;

}