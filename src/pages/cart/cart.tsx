import { DispatchType, RootState } from '../../redux/config-store'
import { useDispatch, useSelector } from 'react-redux'
import { PRODUCT_CARD, settings } from '../../util/config'
import { decreaseProductCard, increaseProductCard, orderProductApi } from '../../redux/products-reducer/product-reducer'
import { Avatar, Button, InputNumber, Space, Table } from 'antd'
import { ProductDetailModel } from '../../models/product.model'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { history } from '../../app'
import { PageConstant } from '../../common/page.constant'
import './cart.scss'
type Props = {}

const Cart = (props: Props) => {
    const dispatch: DispatchType = useDispatch()
    const { productCard } = useSelector((state: RootState) => state.productReducer)
    const { userLogin } = useSelector((state: RootState) => state.userReducer)
    const onDeleteCart = (idClick: number) => {
        const deleteIdProduct = decreaseProductCard(idClick);
        dispatch(deleteIdProduct);
    }
    const checkOutCart = async () => {
        dispatch(orderProductApi(settings.getStorageJson(PRODUCT_CARD)))
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
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: 'img',
            key: '2',
            render: (data: ProductDetailModel) => (
                <>
                    {
                        <Avatar.Group>
                            <Avatar className="shape-avatar" shape="square" size={80} src={data.image}></Avatar>
                        </Avatar.Group>
                    }
                </>
            ),
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: '3',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: '4',
        },
        {
            title: 'quantity',
            render: (data: ProductDetailModel) => {
                return <>
                    <Button className='btn_quatity' onClick={() => {
                        handleQuatity(false, data.id)
                    }}>-</Button>
                    <span className='me-1 ms-1'>{data.quantity}</span>
                    <Button className='btn_quatity' onClick={() => {
                        handleQuatity(true, data.id)
                    }}>+</Button>
                </>
            }
        },
        {
            key: 'total',
            title: 'total',
            render: (data: ProductDetailModel) => (
                <>
                    {
                        data.price * data.quantity
                    }
                </>
            ),
        },
        {
            key: '7',
            title: 'action',
            render: (record: ProductDetailModel) => {
                return <>
                    <EditOutlined />
                    <DeleteOutlined onClick={() => {
                        onDeleteCart(record.id);
                    }} style={{ color: "red", marginLeft: 12 }}></DeleteOutlined>
                </>
            }
        },
    ];
    return (
        <>
            <Table dataSource={productCard} columns={columns} />
            <Button onClick={() => {
                if (userLogin) {
                    checkOutCart()
                } else {
                    history.push(`${PageConstant.login}`)
                }
            }} className='btn-checkout'>Orders</Button>
        </>
    )
}

export default Cart