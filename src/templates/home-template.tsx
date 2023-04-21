import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { PageConstant } from '../common/page.constant'
import { DispatchType, RootState } from '../redux/config-store'
import { useDispatch, useSelector } from 'react-redux'
import { ACCESS_TOKEN, PRODUCT_CARD, settings, USER_LOGIN, USER_PROFILE } from '../util/config'
import { HeartOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Input, Popover, Table } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { TOTAL_QUATITY } from '../util/config'
import { ProductDetailModel } from '../models/product.model'
import { decreaseProductCard, increaseProductCard } from '../redux/products-reducer/product-reducer'
import './template.scss'

type Props = {}

const HomeTemplate = (props: Props) => {
    const navigate = useNavigate();
    const dispatch: DispatchType = useDispatch();
    const { userLogin } = useSelector((state: RootState) => state.userReducer)
    const { quantity, productCard } = useSelector((state: RootState) => state.productReducer)
    const [showInput, setShowInput] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const inputRef = useRef(null);
    const total = settings.getStorageJson(PRODUCT_CARD)?.reduce((acc: number, record) => acc + record.price * record.quantity, 0);
    const renderLoginButton = () => {
        if (userLogin) {
            return <>
                <NavLink to={`${PageConstant.profile}`}
                    style={{ textDecoration: 'none' }}> <h5 className='login mx-2'> He sờ lô ! {userLogin.email}</h5></NavLink>
                <span className='text-danger' style={{ cursor: 'pointer', paddingRight: '15px' }} onClick={() => {
                    settings.clearStorage(ACCESS_TOKEN);
                    settings.clearStorage(USER_LOGIN);
                    settings.clearStorage(PRODUCT_CARD);
                    settings.clearStorage(TOTAL_QUATITY);
                    settings.clearStorage(USER_PROFILE);
                    navigate(`${PageConstant.login}`);
                    window.location.reload();
                }}>Logout</span>
            </>
        }
        return <NavLink to={`${PageConstant.login}`} style={{ textDecoration: 'none' }}><h5 className='login mx-2'>Login</h5></NavLink>;
    }
    const handleClick = () => {
        setShowInput(true);
    }
    const handleOutsideClick = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setShowInput(false);
        }
    }

    const handleQuatity = (decrement: boolean, id: number) => {
        if (decrement === false) {
            const productIndex = productCard.findIndex((product: ProductDetailModel) => product.id === id);
            if (productIndex !== -1) {
                dispatch(decreaseProductCard(id));
            }
        }
        if (decrement === true) {
            const productIndex = productCard.findIndex((product: ProductDetailModel) => product.id === id);
            if (productIndex !== -1) {
                dispatch(increaseProductCard(id));
            }
        }
    }


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 55 && !isScrolled) {
                setIsScrolled(true);
            } else if (currentScrollY === 54 || currentScrollY <= 50 && isScrolled) {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isScrolled]);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price"
        },
        {
            title: "Quantity",
            key: "quantity",
            render: (data: ProductDetailModel) => (
                <>
                    <Button className='btn_quatity' onClick={() => {
                        handleQuatity(false, data.id)
                    }}>-</Button>
                    <span className='me-1 ms-1'>{data.quantity}</span>
                    <Button className='btn_quatity' onClick={() => {
                        handleQuatity(true, data.id)
                    }}>+</Button>
                </>
            )
        },
        {
            title: "Images",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <>
                    <img src={image} alt="product" key={image} style={{ width: 50, height: 50, marginRight: 5 }} />
                </>
            )
        },
        {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (_, record) => {
                const total = record.price * record.quantity;
                return <span>{total}</span>;
            },
        }
    ];

    return (
        <>
            <Navbar className='header' expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <NavLink to={`${PageConstant.home}`}>
                            <img alt="" src="./images/Cyber-Logo.png" className="d-inline-block align-top" />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll> </Nav>
                        {renderLoginButton()}
                        <NavLink style={{ textDecoration: 'none' }} to={`${PageConstant.register}`}><h5 className='login mx-2'>Register</h5></NavLink>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='content' style={{ maxWidth: "90%", margin: "auto" }}>
                <div className="sub-header py-3 ">
                    <div className={`d-flex justify-content-around align-items-center ${isScrolled && 'scrolled'}`}>
                        <img src="./images/log_quanghuy.jpg" alt="" style={{ verticalAlign: "center" }} />
                        <div className='menu-strip d-flex justify-content-center'>
                            <ul className='item-menu d-flex m-0' style={{ textDecoration: "none", listStyle: "none" }}>
                                <li className='px-2'>Home</li>
                                <li className='px-2'>Profile</li>
                                <li className='px-2'>Categories</li>
                                <li className='px-2'>Contact</li>
                            </ul>
                        </div>
                        <div className='like-and-cart d-flex justify-content-around align-items-center'>
                            <div ref={inputRef}>
                                {showInput ? (
                                    <Input.Search
                                        className='me-3'
                                        placeholder="Enter shose name?"
                                        onSearch={value => console.log(value)}
                                        style={{ width: 150 }}
                                    />
                                ) : (
                                    <SearchOutlined className='me-3' onClick={handleClick} />
                                )}
                            </div>
                            <HeartOutlined className='me-3' />
                            <Popover
                                content={
                                    <div className='about_shopping_card'>
                                        <Table columns={columns} dataSource={productCard} rowKey="id" />
                                        <p>Total: {total}</p>
                                    </div>
                                }
                                title={<p className='text-center' style={{ color: 'pink', fontWeight: 'bold' }}>MY SHOES</p>}>
                                <ShoppingCartOutlined />
                            </Popover>
                            <sub className='total_quatity' style={{ color: '#BA7E7E' }}>{quantity}</sub>

                        </div>
                    </div>
                </div>

                <div style={{ minHeight: '90vh' }}>
                    <Outlet />
                </div>
            </div >

            <footer className='bg-dark text-light text-center p-3 mt-5'>
                <div className='row'>
                    <div className="col-lg-4 col-xl-3 offset-xl-1 col-md-4 col-sm-12 col-12">
                        <div className="footer-link">
                            <h4>Quick Link</h4>
                            <ul className="ft-link">
                                <li>
                                    Home
                                </li>
                                <li>
                                    Nike
                                </li>
                                <li>
                                    Adidas
                                </li>
                                <li>
                                    Contact
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3 offset-xl-1 col-md-4 col-sm-12 col-12">
                        <div className="footer-link">
                            <h4>Support</h4>
                            <ul className="ft-link">
                                <li>
                                    About
                                </li>
                                <li>
                                    Contact
                                </li>
                                <li>
                                    Help
                                </li>
                                <li>
                                    Phone
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4 col-xl-3 offset-xl-1 col-md-4 col-sm-12 col-12">
                        <div className="footer-link">
                            <h4>REGISTER</h4>
                            <ul className="ft-link">
                                <li>
                                    Register
                                </li>
                                <li>
                                    Login
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default HomeTemplate