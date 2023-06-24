export type ProductState = {
    arrProduct: ProductModel[],
    productCard: ProductDetailModel[] | null,
    quantity: number,
    totalAmount: number,
    productDetail: ProductDetailModel
    loading: boolean,
    error: any;
    favorite: any,
    searchResult: ProductModel[]
}

export interface ProductModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    description: string;
    shortDescription: string;
    quantity: number;
    deleted: boolean;
    categories: string;
    relatedProducts: string[];
    feature: boolean;
    image: string;
    size: number[];
}

export interface ProductDetailModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    feature: boolean;
    description: string;
    size: any[];
    shortDescription: string;
    quantity: number;
    image: string;
    categories: Category[];
    relatedProducts: RelatedProduct[];
}

export interface Category {
    id: string;
    category: string;
}

export interface RelatedProduct {
    id: number;
    name: string;
    alias: string;
    feature: boolean;
    price: number;
    description: string;
    shortDescription: string;
    image: string;
    relatedProducts: string[];
    size: any;
}

export interface Orders {
    ordersHistory: OrdersHistory[];
    email: string;
    name: string;
    password: null;
    gender: boolean;
    phone: string;
    facebookId: string;
    deleted: boolean;
    avatar: string;
}

export interface OrdersHistory {
    orderDetail: OrderDetail[];
    id: number;
    date: Date;
    status: null;
    email: string;
    alias: string;
}

export interface OrderDetail {
    name: string;
    alias: string;
    shortDescription: string;
    quantity: number;
    price: number;
    image: string;
    description: string;
}

export interface Favorite {
    productsFavorite: ProductsFavorite[];
    email: string;
}

export interface ProductsFavorite {
    id: number;
    name: string;
    image: string;
}

export interface EditUserProfile {
    id: number;
    name: string;
    phone: number;
    password: string;
    gender: boolean
}

