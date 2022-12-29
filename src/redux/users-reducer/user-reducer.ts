import { userLoginModel, userLoginResult } from './../../models/user.model';
import { USER_LOGIN, http, ACCESS_TOKEN } from './../../util/config';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { settings } from '../../util/config';
import { userState } from '../../models/user.model';


const initialState: userState = {
    userLogin: null,
}


const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(userLoginApi.fulfilled, (state: userState, action: PayloadAction<userLoginResult>) => {
            state.userLogin = action.payload;
            settings.setStorageJson(USER_LOGIN, action.payload);
            settings.setCookieJson(USER_LOGIN, action.payload, 30);
            settings.setStorage(ACCESS_TOKEN, action.payload.accessToken);
            settings.setCookie(ACCESS_TOKEN, action.payload.accessToken, 30);
            // history.push('/profile');
        });
    },
});


export default userReducer.reducer
export const userLoginApi = createAsyncThunk('userReducer/userLoginApi', async (userLogin: userLoginModel): Promise<userLoginResult> => {
    try {
        const result = await http.post('/api/Users/signin', userLogin)
        return result.data.content
    } catch (err) {
        console.log(err)
    }
})
