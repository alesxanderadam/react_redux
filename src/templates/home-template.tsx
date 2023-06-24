import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { PageConstant } from '../common/page.constant'
import { DispatchType, RootState } from '../redux/config-store'
import { useDispatch, useSelector } from 'react-redux'
import { ACCESS_TOKEN, PRODUCT_CARD, settings, USER_LOGIN, USER_PROFILE } from '../util/config'
import { DeleteOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Input, MenuProps, Modal, Popover, Space, Table } from 'antd'
import { useEffect, useRef, useState, useMemo } from 'react'
import { TOTAL_QUATITY } from '../util/config'
import { ProductDetailModel } from '../models/product.model'
import { decreaseProductCard, getListProductSearchApi, increaseProductCard, orderProductApi } from '../redux/products-reducer/product-reducer'
import './template.scss'
import { history } from '../app'
import utils from '../util/formater-number'

type Props = {}

const HomeTemplate = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const { userLogin, userProfile } = useSelector((state: RootState) => state.userReducer)
    const { quantity, productCard } = useSelector((state: RootState) => state.productReducer)
    const [showInput, setShowInput] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [visible, setVisible] = useState(false);
    const inputRef = useRef(null);
    const total = settings.getStorageJson(PRODUCT_CARD)?.reduce((acc: number, record) => acc + record.price * record.quantity, 0);
    const renderLoginButton = () => {
        if (userLogin) {
            return <ul className="nav navbar-nav nav-flex-icons mx-3 flex-row">
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                    <Avatar icon={<UserOutlined />} size="large" />
                </Dropdown>
            </ul>
        }
        return (
            <>
                <NavLink to={`${PageConstant.login}`} style={{ textDecoration: 'none' }}><h5 className='login mx-2'>Login</h5></NavLink>
                <NavLink to={`${PageConstant.register}`} style={{ textDecoration: 'none' }}><h5 className='login mx-2'>Register</h5></NavLink>
            </>
        )
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

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <NavLink style={{ textDecoration: 'none' }} to={PageConstant.profile}>
                    Profile
                </NavLink>
            ),
        },
        {
            key: '2',
            label: (
                <span style={{ color: 'red' }} onClick={() => {
                    settings.clearStorage(ACCESS_TOKEN);
                    settings.clearStorage(USER_LOGIN);
                    settings.clearStorage(PRODUCT_CARD);
                    settings.clearStorage(TOTAL_QUATITY);
                    settings.clearStorage(USER_PROFILE);
                    window.location.reload();
                }}>
                    Logout
                </span>
            ),
        },
    ];

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            width: 170,
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
            width: 130,
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
        },
        {
            title: "Action",
            key: "id",
            render: (data: ProductDetailModel) => {
                return <Button className='action_delete_antd' onClick={() => {
                    const deleteIdProduct = decreaseProductCard(data.id);
                    dispatch(deleteIdProduct);
                }}><DeleteOutlined style={{ color: 'red' }} /></Button>
            },
        }
    ];

    return (
        <>
            <Navbar className='header' expand="lg">
                <Container fluid>
                    <Navbar.Brand>
                        <NavLink to={`${PageConstant.home}`}>
                            <img alt="" src="./images/log_quanghuy.jpg" className="img-fluid" width={40} height={40} style={{ borderRadius: "100rem" }} />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll> </Nav>
                        {renderLoginButton()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='content' style={{ maxWidth: "90%", margin: "auto" }}>
                <div className="sub-header py-3 ">
                    <div className={`d-flex justify-content-around align-items-center ${isScrolled && 'scrolled'}`}>
                        <img src="./images/logo_nike.png" alt="" style={{ verticalAlign: "center" }} />
                        <div className='menu-strip d-flex justify-content-center'>
                            <ul className='item-menu d-flex m-0' style={{ textDecoration: "none", listStyle: "none" }}>
                                <Link to={`${PageConstant.home}`} className='px-2'>
                                    Home
                                </Link>
                                <Link to={`${PageConstant.profile}`} className='px-2'>
                                    Profile
                                </Link>
                                <Link to={`${PageConstant.cart}`} className='px-2'>
                                    Cart
                                </Link>
                                <Link to={`${PageConstant.home}`} className='px-2'>
                                    Contact
                                </Link>
                            </ul>
                        </div>
                        <div className='like-and-cart d-flex justify-content-around align-items-center'>
                            <div ref={inputRef}>
                                {showInput ? (
                                    <Input.Search
                                        className='me-3'
                                        placeholder="Enter shose name?"
                                        onSearch={value => {
                                            dispatch(getListProductSearchApi(utils.$common.converVietNamese(value)))
                                            history.push(PageConstant.search)
                                        }}
                                        style={{ width: 150 }}
                                    />
                                ) : (
                                    <SearchOutlined className='me-3' onClick={handleClick} />
                                )}
                            </div>
                            <HeartOutlined className='me-3' />
                            <Popover
                                placement="bottom"
                                open={visible}
                                onOpenChange={setVisible}
                                content={
                                    <div className='about_shopping_card'>
                                        <Table sticky={true} columns={columns} dataSource={productCard} rowKey="id" />
                                        <div className='pay d-flex justify-content-between align-items-center px-2'>
                                            <p className='m-0'>Total: {total}</p>
                                            <button className='btn_order' onClick={() => {
                                                dispatch(orderProductApi(settings.getStorageJson(PRODUCT_CARD)))
                                            }}>Order</button>
                                        </div>

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