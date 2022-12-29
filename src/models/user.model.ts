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