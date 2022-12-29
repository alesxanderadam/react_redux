import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card'
import { RelatedProduct } from '../../models/product.model'
import { DispatchType, RootState } from '../../redux/config-store'
import { getProductDetailApi } from '../../redux/products-reducer/product-reducer'

type Props = {}

const Detail = ({ }: Props) => {
    const { id }: any = useParams()
    const { productDetail } = useSelector((state: RootState) => state.productReducer)
    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        const actionThunk = getProductDetailApi(id as number)
        dispatch(actionThunk);
    }, [id])

    return <>
        <div className='container'>
            <div className="row mt-2">
                <div className="col-xl-4">
                    <img src={productDetail?.image} alt='...' height={350} width={350} style={{ objectFit: 'cover' }}></img>
                </div>
                <div className="col-xl-8">
                    <h3>{productDetail?.name}</h3>
                    <p>{productDetail?.description}</p>
                </div>
            </div>
            <h3 className='mt-2 text-center'>-Realate Product-</h3>
            <div className="row">
                {productDetail?.relatedProducts.map((prod: RelatedProduct, index: number) => {
                    return <div className="col-xl-4">
                        <ProductCard product={prod} />
                    </div>
                })}
            </div>
        </div>
    </>
}
export default Detail   