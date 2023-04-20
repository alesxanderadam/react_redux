export interface userLoginResult {
    email: string,
    accessToken: string,
}


export interface userState {
    userLogin: userLoginResult,
    userProfile: UserProfile

}


export class userLoginModel {
    email: string
    password: string
}


export class UserUpdateModel {
    email: string;
    password: string;
    name: string;
    gender: boolean;
    phone: number;
}

export class UserModel extends UserUpdateModel {
    id?: string
}

export interface Content {
    email: string;
    password: string;
    name: string;
    gender: boolean;
    phone: string;
}


export interface userRegisterResult {
    statusCode: number;
    message: string;
    content: Content;
    dateTime: Date;
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

export interface UserProfile {
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
