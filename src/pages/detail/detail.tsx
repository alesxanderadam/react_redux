import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/config-store'
import { addProductToCardAction, getProductDetailApi } from '../../redux/products-reducer/product-reducer'
import { HeartOutlined } from '@ant-design/icons'
import './detail.scss'
import { ACCESS_TOKEN, settings } from '../../util/config'
import { message } from 'antd'
import { history } from '../../app'
import { PageConstant } from '../../common/page.constant'
type Props = {}

const Detail = ({ }: Props) => {
    const { id }: any = useParams()
    const { productDetail } = useSelector((state: RootState) => state.productReducer)
    const dispatch: DispatchType = useDispatch();

    const handleAddToCart = () => {
        if (settings.getStore(ACCESS_TOKEN)) {
            dispatch(addProductToCardAction(productDetail))
        } else {
            message.warning("Login ?")
            history.push(`${PageConstant.login}`)
        }
    }
    useEffect(() => {
        const actionThunk = getProductDetailApi(id as number)
        dispatch(actionThunk);
    }, [id])

    return <>
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-6'>
                    <div className='p-2 bg_image_banner '>
                        <div className='image_product_detail'>
                            <img className='img-fluid' src={productDetail?.image} alt="" />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className='content_product_detail p-2'>
                        <h3>{productDetail?.name}</h3>
                        <p>Men's Shoes</p>
                        <div className='product_detail_price d-flex justify-content-between align-items-center'>
                            <h5>MRP: {productDetail?.price}</h5>
                            <p>12.50% off</p>
                        </div>
                        <div className='sub_discount'>
                            <p>Incl of taxes</p>
                            <p>Also inclues all aplication duties</p>
                        </div>
                        <div className='product_detail_sizes'>
                            <div className='d-flex w-100 justify-content-between title_size'>
                                <p>Select size</p>
                                <p>Select guide</p>
                            </div>
                            {productDetail?.size?.map((item, index: number) => {
                                return <button key={index}>{item}</button>
                            })}
                        </div>

                        <div className='btn_product_detail'>
                            <button className="add_detail" onClick={handleAddToCart}>Add to Cart</button>
                            <button className="whishlist">whishlist <HeartOutlined style={{ verticalAlign: 'middle', marginLeft: '3px' }} /></button>
                        </div>

                        <div className='description_detail'>
                            <h5>Product detail</h5>
                            <p>{productDetail?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Detail   