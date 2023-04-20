import { UserProfile, UserUpdateModel, userLoginModel, userLoginResult, userRegisterResult } from './../../models/user.model';
import { USER_LOGIN, http, ACCESS_TOKEN, USER_PROFILE } from './../../util/config';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { settings } from '../../util/config';
import { userState } from '../../models/user.model';
import { message } from 'antd';


const initialState: userState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
    userProfile: settings.getStorageJson(USER_PROFILE) ? settings.getStorageJson(USER_PROFILE) : null,

}


const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userLoginApi.fulfilled, (state: userState, action: PayloadAction<userLoginResult>) => {
            state.userLogin = action.payload;
            message.success("Login success")
            settings.setStorageJson(USER_LOGIN, action.payload);
            settings.setCookieJson(USER_LOGIN, action.payload, 30);
            settings.setStorage(ACCESS_TOKEN, action.payload.accessToken);
            settings.setCookie(ACCESS_TOKEN, action.payload.accessToken, 30);
        });
        builder.addCase(userRegisterApi.fulfilled, (state: any, action: PayloadAction<userRegisterResult>) => {
            message.success("Register success")
        });
        builder.addCase(getProfileApi.fulfilled, (state: userState, action: PayloadAction<UserProfile>) => {
            state.userProfile = action.payload;
            settings.setStorageJson(USER_PROFILE, action.payload);
        });
        builder.addCase(updateProfileApi.fulfilled, (state: userState, action: PayloadAction<UserProfile>) => {
            state.userProfile = { ...state.userProfile, ...action.payload }
            settings.setStorageJson(USER_PROFILE, { ...state.userProfile })
            message.success("Update success")
        })
    }
});


export default userReducer.reducer
export const userLoginApi = createAsyncThunk('userReducer/userLoginApi', async (userLogin: userLoginModel): Promise<userLoginResult> => {
    try {
        const result = await http.post('/api/Users/signin', userLogin)
        return result.data.content
    } catch (err) {
        console.log(err)
        return;
    }
})
export const userRegisterApi = createAsyncThunk('userReducer/userRegisterApi', async (userRegister: UserUpdateModel): Promise<userRegisterResult> => {
    try {
        const result = await http.post('/api/Users/signup', userRegister)
        return result?.data?.content;
    } catch (err) {
        console.log(err)
        return;
    }
})
export const getProfileApi = createAsyncThunk('userReducer/getProfileApi', async (): Promise<UserProfile> => {
    try {
        const result = await http.post('/api/Users/getProfile')
        return result?.data?.content
    } catch (err) {
        console.log(err)
        return;
    }
})
export const updateProfileApi = createAsyncThunk('userReducer/updateProfileApi', async (editProfile: UserProfile): Promise<UserProfile> => {
    try {
        const result = await http.post('/api/Users/updateProfile', editProfile)
        if (result) {
            return editProfile
        }
        return;
    } catch (error) {
        message.error(`${error.response.data.content}`);
        return;
    }
})
