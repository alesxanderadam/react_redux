import { Carousel } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../../components/product-card/product-card'
import { ProductModel } from '../../models/product.model'
import { DispatchType, RootState } from '../../redux/config-store'
import { getProductApi } from '../../redux/products-reducer/product-reducer'

type Props = {}

const Home = (props?: Props) => {
    const { arrProduct } = useSelector((state: RootState) => state.productReducer)
    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        const actiongetProduct = getProductApi()
        dispatch(actiongetProduct)
    }, [])
    return (
        <>
            <Carousel autoplay={true} dots={true}>
                {arrProduct?.filter(x => x.id < 5)?.map((item, index) => {
                    return <div key={index}>
                        <div className="row align-items-center text-center" >
                            <div className="col-xl-6 col-xs-12">
                                <img className="img-fluid" src={item.image}></img>
                            </div>
                            <div className="col-md-6 col-xs-12">
                                <div>
                                    <h1>{item.name}</h1>
                                    <p>{item.description}</p>
                                    <button className="btn btn-warning">Buy now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </Carousel>
            <div className="title-component my-5">
                <h1>Profile</h1>
            </div>
            <div className='row'>
                {arrProduct?.map((item: ProductModel, index) => {
                    return <div className="col-xl-4 col-lg-4 col-sm-12" key={index}>
                        <ProductCard product={item} />
                    </div>

                })}
            </div>
        </>
    )
}

export default Home