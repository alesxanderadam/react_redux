import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { http } from '../../util/config';
import { ProductDetailModel, ProductModel, ProductState } from '../../models/product.model';
import { DispatchType } from '../config-store';
const initialState: ProductState = {
    arrProduct: null,
    productDetail: null
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
        }
    }
}
/* ------------------ create asyn thunk ----------------------------------*/
export const getProductDetailApi = createAsyncThunk('productReducer/getProductDetailApi', async (productId: number) => {
    try {
        const result = await http.get(`/api/Product/getbyid?id=${productId}`)
        return result.data.content;
    }
    catch (err) {
        console.log(err)
    }
})