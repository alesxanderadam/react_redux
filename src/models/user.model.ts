export interface userLoginResult {
    email: string,
    accessToken: string,
}


export interface userState {
    userLogin: userLoginResult
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

