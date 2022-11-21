export type CartItem = {
    id: string;
    size: number;
    title: string;
    type: string;
    price: number;
    count: number;
    imageUrl: string;
}

export interface CartSliceState {
    totalPrice: number;
    items: CartItem[];
}