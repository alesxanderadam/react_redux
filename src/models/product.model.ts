export type ProductState = {
    arrProduct: ProductModel[],
    productCard: ProductDetailModel[] | null,
    quantity: number,
    totalAmount: number,
    productDetail: ProductDetailModel | null,
    loading: boolean;
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
    size: string;
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
