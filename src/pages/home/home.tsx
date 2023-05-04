import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/config-store'
import { getProductApi, setLoaddingAcion, setSuccess } from '../../redux/products-reducer/product-reducer'
import { Carousel } from 'antd';
import './home.scss'
import { ProductModel } from '../../models/product.model';
import ProductCard from '../../components/product-card/product-card';
import ReactPaginate from 'react-paginate';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Loader } from '../../components/loader/loader';
type Props = {}

const Home = (props?: Props) => {
    const { arrProduct, loading } = useSelector((state: RootState) => state.productReducer)

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToScroll: 1,
        initialSlide: 1,
        pauseOnDotsHover: true,
        autoplay: true
    };

    const [pageNumber, setPageNumber] = useState(0);
    // số lượng sản phẩm mỗi trang
    const productPerPage = 6;
    // trang đến: 0 * 9 = 0 trang
    const vistedPage = pageNumber * productPerPage;
    // hiển thị trang sản phẩm : danh sách sản phẩm từ vị trí (0, 9) nếu là trang 1
    // hoặc từ (10, 19) nếu là trang 2
    const displayPage = arrProduct?.slice(
        vistedPage,
        vistedPage + productPerPage
    );
    // hiển thị số phân trang
    const pageCount = Math.ceil(arrProduct?.length / productPerPage);
    // đổi trang hiển thị
    // selected tương ứng: trang 1: seleted 0, trang 2: selected: 1
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };



    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        dispatch(setLoaddingAcion());
        dispatch(getProductApi()).then(() => {
            dispatch(setSuccess())
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    return (
        <>
            {loading ? <Loader /> : <div>
                <Carousel prefixCls=''  {...settings} effect='fade'>
                    {arrProduct?.filter(x => x.id < 5)?.map((item, index) => {
                        return <>
                            <div className='p-2 banner_slide' key={index}>
                                <div className='row bg_banner'>
                                    <div className='col-6'>
                                        <div className='content_banner p-2'>
                                            <div className='logo_banner'>
                                                <p>ZAP</p>
                                                <p>POS</p>
                                            </div>
                                            <div className='title_banner'>
                                                <p>Discover limited sneakers without limitation</p>
                                            </div>
                                            <button className="btn btn-buy mt-4">START NOW</button>
                                            <div className='description_banner'>{item.description}</div>
                                            <div className='link_banner d-flex justify-content-between align-items-center'>
                                                <ul className='d-flex p-0' style={{ listStyle: 'none' }}>
                                                    <li>Shop</li>
                                                    <li className='mx-3'>Models</li>
                                                    <li>Categorys</li>
                                                </ul>
                                                <a href='https://www.facebook.com/letran.quanghuy.31/' className='contact_socialNetwork'>Intagram / Facebook</a>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='col-6'>
                                        <div className='p-2 bg_image_banner'>
                                            <div className='images_banner'>
                                                <img className='img-fluid' src={item.image} alt="" />
                                                <span>0{index}</span>
                                            </div>
                                            <div className='information_product_banner'>
                                                <div className='d-flex justify-content-between px-2'>
                                                    <p>MATERIAL</p>
                                                    <p>X-ELASTIC-SYSTEM</p>
                                                </div>
                                                <hr />
                                                <div className='d-flex justify-content-between px-2'>
                                                    <p>SERIES PRODUCTION</p>
                                                    <p>V1,5 - 2023</p>
                                                </div>
                                            </div>
                                            <p className='detail_product_banner'>View detail product</p>
                                            <p className='arrow_animation'><ArrowRightOutlined /></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })}
                </Carousel>

                <div className="title-component">
                    <h1 className='text-center'>Cushion for your miles</h1>
                    <p className='text-center'>A light has Nike ZoomX midosle is combine with increased stack heights to <br /> help provide cushion during extendends stretches of running</p>
                </div>

                <div className='row bg-body-product'>
                    {displayPage?.map((item: ProductModel, index) => {
                        return <div className="col-xxl-4 col-md-6 mt-5 p-0 " key={index}>
                            <ProductCard product={item} />
                        </div>

                    })}
                </div>

                <div>
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={changePage}
                        previousLabel="Prev"
                        nextLabel="Next"
                        containerClassName="paginationBtns"
                    />
                </div>
            </div>}
        </>
    )
}

export default Home