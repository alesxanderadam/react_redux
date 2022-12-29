import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./products-reducer/product-reducer";
import userReducer from './users-reducer/user-reducer';

export const store = configureStore({
    reducer: {
        productReducer,
        userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch