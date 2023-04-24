import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http, PRODUCT_CARD, settings, TOTAL_QUATITY, USER_PROFILE } from '../../util/config';
import { Favorite, Orders, ProductDetailModel, ProductModel, ProductState } from '../../models/product.model';
import { DispatchType } from '../config-store';
import { message } from 'antd';
import { getProfileApi } from '../users-reducer/user-reducer';
const initialState: ProductState = {
    arrProduct: null,
    productCard: settings.getStorageJson(PRODUCT_CARD) ? settings.getStorageJson(PRODUCT_CARD) : [],
    quantity: settings.getStore(TOTAL_QUATITY) ? settings.getStore(TOTAL_QUATITY) : 0,
    totalAmount: 0,
    productDetail: null,
    loading: true,
    error: null,
    favorite: []
}

const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setArrProductAction: (state: ProductState, action) => {
            state.arrProduct = action.payload
        },
        getproductfavoriteAction: (state: ProductState, action: PayloadAction) => {
            state.favorite = action.payload
        },
        setLoaddingAcion: ((state: ProductState) => {
            state.loading = true
        }),
        setSuccess: ((state: ProductState) => {
            state.loading = false;
            state.error = null;
        }),
        setError: ((state: ProductState, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
    extraReducers(builder) {
        //pending: Đang xử lý
        //fulfilled: Đã xử lý thành công
        //rejected: Thất bại
        //Gêt product
        builder.addCase(getProductDetailApi.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getProductDetailApi.fulfilled, (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
            state.loading = false;
            state.productDetail = action.payload;
        });

        builder.addCase(getProductDetailApi.rejected, (state: ProductState, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(addProductToCardAction.fulfilled, (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
            state.loading = false;
            const isExisted = state.productCard?.find((item: ProductDetailModel) => item.id === action.payload.id);
            state.quantity++;
            settings.setStorage(TOTAL_QUATITY, String(state.quantity))
            if (!isExisted) {
                state.productCard?.push({
                    ...action.payload,
                    quantity: 1,
                })
                settings.setStorageJson(PRODUCT_CARD, [...state.productCard])
            }
            else {
                isExisted.quantity++;
                isExisted.price += isExisted.price
                settings.setStorageJson(PRODUCT_CARD, [...state.productCard])
            }
            state.totalAmount = state.productCard?.reduce(
                (total: number, item: ProductDetailModel) => total + Number(item.price) * Number(item.quantity),
                0
            )
        });
        builder.addCase(addProductToCardAction.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(updateProductCard.fulfilled, (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
            // Update productCard in the state with the new product data
            const index = state.productCard.findIndex((product) => product.id === action.payload.id);
            if (index !== -1) {
                state.productCard[index] = action.payload;
            } else {
                state.productCard.push(action.payload);
            }

            // Update quantity and total amount in the state
            state.quantity = state.productCard.reduce((sum, product) => sum + product.quantity, 0);
            state.totalAmount = state.productCard.reduce((sum, product) => sum + product.quantity * product.price, 0);

            // Update productCard in the local storage
            settings.setStorageJson(PRODUCT_CARD, state.productCard);

            // Update total quantity in the local storage
            settings.setStorage(TOTAL_QUATITY, String(state.quantity));
        });
        builder.addCase(decreaseProductCard.fulfilled, (state: ProductState, action: PayloadAction<number>) => {
            // Decrease product quantity in the productCard array
            const index = state.productCard.findIndex((product) => product.id === action.payload);
            if (index !== -1) {
                state.productCard[index].quantity -= 1;
                if (state.productCard[index].quantity === 0) {
                    state.productCard.splice(index, 1);
                }
            }

            // Update quantity and total amount in the state
            state.quantity = state.productCard.reduce((sum, product) => sum + product.quantity, 0);
            state.totalAmount = state.productCard.reduce((sum, product) => sum + product.quantity * product.price, 0);

            // Update productCard in the local storage
            settings.setStorageJson(PRODUCT_CARD, state.productCard);

            // Update total quantity in the local storage
            settings.setStorage(TOTAL_QUATITY, String(state.quantity));
        });
        builder.addCase(increaseProductCard.fulfilled, (state: ProductState, action: PayloadAction<number>) => {
            const index = state.productCard.findIndex((product) => product.id === action.payload);
            if (index !== -1) {
                state.productCard[index].quantity += 1;
            }

            // Update quantity and total amount in the state
            state.quantity = state.productCard.reduce((sum, product) => sum + product.quantity, 0);
            state.totalAmount = state.productCard.reduce((sum, product) => sum + product.quantity * product.price, 0);

            // Update productCard in the local storage
            settings.setStorageJson(PRODUCT_CARD, state.productCard);

            // Update total quantity in the local storage
            settings.setStorage(TOTAL_QUATITY, String(state.quantity));
        });
    }
});
export const { setArrProductAction, getproductfavoriteAction, setLoaddingAcion, setSuccess } = productReducer.actions
export default productReducer.reducer
/* ---------------- action api async action ----------  */
export const getProductApi = () => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await http.get(`/api/Product`)
            const content: ProductModel[] = result.data.content
            const action: PayloadAction<ProductModel[]> = setArrProductAction(content)
            dispatch(action)
        } catch (err) {
            console.log(err);
            return;
        }
    }
}

export const getproductfavoriteApi = () => {
    return async (dispatch: DispatchType): Promise<Favorite> => {
        try {
            const result = await http.get(`/api/Users/getproductfavorite`)
            const action = getproductfavoriteAction(result.data.content)
            dispatch(action)
        } catch (err) {
            console.log(err)
            return;
        }
    }
}
/* ------------------ create asyn thunk ----------------------------------*/
export const getProductDetailApi = createAsyncThunk('productReducer/getProductDetailApi', async (productId: number): Promise<ProductDetailModel> => {
    try {
        const result = await http.get(`/api/Product/getbyid?id=${productId}`)
        return result.data.content;
    }
    catch (err) {
        console.log(err)
    }
})

export const addProductToCardAction = createAsyncThunk('productReducer/addProductToCardAction', (product: any) => {
    try {
        return product
    } catch (error) {
        console.log(error)
        return;
    }
})

export const updateProductCard = createAsyncThunk('productReducer/updateProductCard', async (product: ProductDetailModel): Promise<ProductDetailModel> => {
    try {
        return product;
    } catch (error) {
        throw error;
    }
})

export const decreaseProductCard = createAsyncThunk('productReducer/decreaseProductCard', async (id: number): Promise<number> => {
    try {
        return id;
    } catch (error) {
        throw error;
    }
})

export const increaseProductCard = createAsyncThunk('productReducer/increaseProductCard', async (id: number): Promise<number> => {
    try {
        return id;
    } catch (error) {
        throw error;
    }
})

export const deleteOrder = createAsyncThunk<boolean, number, { rejectValue: string }>(
    'productReducer/deleteOrder',
    async (id: number, thunkAPI) => {
        try {
            const result = await http.post(`/api/Users/deleteOrder`, { orderId: id })
            if (result.data.statusCode === 200) {
                let data: Orders = settings.getStorageJson(USER_PROFILE)
                if (data !== null) {
                    data.ordersHistory.filter((productId) => productId.id !== id)
                    settings.setStorageJson(USER_PROFILE, data)
                }
                thunkAPI.dispatch(getProfileApi());
                message.success("Delete success !");

            } else {
                message.error("Delete not success")
                return;
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const orderProductApi = createAsyncThunk<boolean, ProductDetailModel, { rejectValue: string }>(
    'productReducer/orderProductApi',
    async (product: ProductDetailModel, thunkAPI): Promise<any> => {
        try {
            await http.post(`/api/Users/order`, product)
            return product
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);