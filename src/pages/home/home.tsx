import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/config-store'
import { getProductApi } from '../../redux/products-reducer/product-reducer'
import { Carousel } from 'antd';
import './home.scss'
import { ProductModel } from '../../models/product.model';
import ProductCard from '../../components/product-card/product-card';
type Props = {}

const Home = (props?: Props) => {
    const { arrProduct } = useSelector((state: RootState) => state.productReducer)
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        pauseOnDotsHover: true,
        autoplay: true
    };



    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        dispatch(getProductApi())
    }, [])
    return (
        <>
            <Carousel prefixCls=''  {...settings} effect='fade'>
                {arrProduct?.filter(x => x.id < 5)?.map((item, index) => {
                    return <div key={index} className='background-carousel mt-5'>
                        <div className="row align-items-center text-center" >
                            <div className="col-lg-6 col-12 background-image-product mb-5">
                                <img className="img-fluid m-auto" width={"400px"} src={item.image}></img>
                                <button className="btn btn-buy">Buy now</button>
                            </div>
                            <div className="col-lg-6 col-12 border-item">
                                <div className='title-pd-carousel'>
                                    <h2 className='title-pd-carousel pb-2 m-0'>{item.name.length > 30 ? item.name.substring(0, 30) + " ... " : item.name}</h2>
                                    <p className='pb-2'>{item.description.length > 200 ? item.description.substring(0, 100) + " ... " : item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </Carousel>

            {/* <div className="title-component my-5">
                <h1>Profile</h1>
            </div> */}
            <div className='row bg-body-product'>
                {arrProduct?.map((item: ProductModel, index) => {
                    return <div className="col-xl-4 col-sm-6 p-0" key={index}>
                        <ProductCard product={item} />
                    </div>

                })}
            </div>
        </>
    )
}

export default Home