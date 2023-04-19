import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http, PRODUCT_CARD, settings, TOTAL_QUATITY } from '../../util/config';
import { ProductDetailModel, ProductModel, ProductState } from '../../models/product.model';
import { DispatchType } from '../config-store';
const initialState: ProductState = {
    arrProduct: null,
    productCard: settings.getStorageJson(PRODUCT_CARD) ? settings.getStorageJson(PRODUCT_CARD) : [],
    quantity: settings.getStore(TOTAL_QUATITY) ? settings.getStore(TOTAL_QUATITY) : 0,
    totalAmount: 0,
    productDetail: null,
}

const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setArrProductAction: (state: ProductState, action) => {
            state.arrProduct = action.payload
        }
    },
    extraReducers(builder) {
        //pending: Đang xử lý
        //fulfilled: Đã xử lý thành công
        //rejected: Thất bại
        builder.addCase(getProductDetailApi.pending, (state, action) => {
            // turn on loading
        });
        builder.addCase(getProductDetailApi.fulfilled, (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
            // turn off loading
            state.productDetail = action.payload;
        });
        builder.addCase(getProductDetailApi.rejected, (state, action) => {
            // turn off loading
        });
        builder.addCase(addProductToCardAction.fulfilled, (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
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
    }
});
export const { setArrProductAction } = productReducer.actions
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
