import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/config-store';
import { Avatar, Button, Form, Input, Modal, Select, Table, Tag } from 'antd';
import utils from '../../util/formater-number';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { getProfileApi, updateProfileApi } from '../../redux/users-reducer/user-reducer';
import { getproductfavoriteApi } from '../../redux/products-reducer/product-reducer';
import './profile.scss'
import { EditUserProfile, Favorite } from '../../models/product.model';
import { ProductsFavorite } from '../../models/product.model';
import { UserProfile } from '../../models/user.model';
type Props = {}

const Profile = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const { userProfile } = useSelector((state: RootState) => state.userReducer)
    const { favorite } = useSelector((state: RootState) => state.productReducer)
    let arrProduct = [];
    let arrayProductFavorite = [];
    if (userProfile) {
        arrProduct = userProfile.ordersHistory;
    }
    if (arrayProductFavorite) {
        arrayProductFavorite = favorite.productsFavorite
    }

    const [form] = Form.useForm();
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    const columns = [
        {
            title: 'id',
            key: 'id',
            dataIndex: 'id'
        },
        {
            key: 'image',
            title: 'Image',
            dataIndex: 'orderDetail',
            width: 250,
            render: (data: ProductsFavorite[]) => (
                <>
                    {data.map((tag, index: number) => {
                        return (
                            <Avatar.Group key={index}>
                                <Avatar className="shape-avatar" shape="square" size={80} src={tag.image}></Avatar>
                            </Avatar.Group>
                        )
                    })}
                </>
            ),
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'orderDetail',
            render: (data: any) => (
                <>
                    {data.map((item, index) => {
                        return (
                            <span key={index}>{item.name + ' , '}</span>
                        )
                    })}
                </>
            )
        },
        {
            key: 'price',
            title: 'price',
            dataIndex: 'orderDetail',
            render: (data: any) => (
                <>
                    {data.map((item, index) => {
                        return (
                            <span key={index}>{item.price + ' , '}</span>
                        )
                    })}
                </>
            )
        },
        {
            key: 'quatatity',
            title: 'quatatity',
            dataIndex: 'orderDetail',
            render: (data: any) => (
                <>
                    {data.map((item, index) => {
                        return (
                            <Tag color="default" key={index}>{item.quantity}</Tag>
                        )
                    })}
                </>
            )
        },
        {
            key: 'total',
            title: 'total',
            dataIndex: 'orderDetail',
            render: (data: any) => (
                <>
                    {data.map((item, index) => {
                        return (
                            <span key={index}>{`${utils.$number.numberFormatter(item.price * item.quantity)}` + ' , '}</span>
                        )
                    })}
                </>
            ),
        }, {
            key: 'delete',
            title: 'Action',
            dataIndex: 'id',
            name: 'orderId',
            render: (data: any) => (
                <>
                    <div className="ant-employed d-flex align-items-center justify-content-center">
                        <Button name="orderId" className="mx-2 table-action-button" onClick={() => { showDeleteConfirm(data); }} >
                            <DeleteOutlined style={{ fontSize: '14px', marginBottom: '5px' }} />
                        </Button>
                    </div>
                </>
            ),
        },
    ];

    const columnFavouriteProduct = [
        {
            title: 'Id',
            key: 'id',
            dataIndex: 'id',
            width: "30%"
        },
        {
            key: 'image',
            title: 'Image',
            dataIndex: 'image',
            width: "30%",
            render: (data: string) => (
                <>
                    <Avatar.Group>
                        <Avatar className="shape-avatar" shape="square" size={80} src={data}></Avatar>
                    </Avatar.Group>
                </>
            ),
        },
        {
            key: 'name',
            title: 'Name',
            dataIndex: 'name',
            width: "20%"
        },
    ];

    const { confirm } = Modal;
    const showDeleteConfirm = (data) => {
        confirm({
            title: "Xóa giỏ hàng",
            icon: <ExclamationCircleFilled />,
            content: `Người dùng: ${data} sẽ bị được xóa? `,
            okText: "Đồng ý",
            okType: "primary",
            cancelText: "Không",
            onOk() {
                // const deleteIdProduct = deleteIdProductApi({
                //     orderId: data
                // })
                // dispatch(deleteIdProduct)
            },
            onCancel() {
                console.log("Hủy");
            },
        });
    };
    const onSubmit = (values: UserProfile) => {
        const editProfile = updateProfileApi(values)
        dispatch(editProfile)
    }

    useEffect(() => {
        if (!userProfile) {
            dispatch(getProfileApi())
        }
        dispatch(getproductfavoriteApi())
        form.setFieldsValue(userProfile)
    }, [userProfile])
    return (
        <>
            <div className="title-component my-5">
                <h1>Profile</h1>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className=" col-xl-4 col-xs-12 ">
                        <div className="avatar m-auto   ">
                            <img src={userProfile?.avatar} alt="..." className='w-100'></img>
                        </div>
                    </div>
                    <div className=" col-xl-4 col-xs-12 ">
                        <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                                <Input className='input-form-login' />
                            </Form.Item>

                            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                                <Input className='input-form-login' />
                            </Form.Item>

                            <Form.Item>
                                <Button className="edit-button-profile mt-3" type="primary" htmlType="submit"> Update </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className=" col-xl-4 col-xs-12 ">
                        <Form layout="vertical" name="basic" form={form} validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                                <Input className='input-form-login' />
                            </Form.Item>

                            <Form.Item label="Password" name="newPassword" >
                                <Input.Password id="password" className='input-form-login' />
                            </Form.Item>

                            <Form.Item name="gender" label="Gender" hasFeedback >
                                <Select placeholder="Please select gender">
                                    <Select.Option value={false}>Male</Select.Option>
                                    <Select.Option value={true}>Female</Select.Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <hr className="pb-4" />
                <div>
                    <ul className="nav chose pb-5 d-flex nav-tabs" id="myTab" role="tablist">
                        <button className="nav-link active chose-item" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><h1>Order history</h1></button>
                        <button className="nav-link mx-3 chose-item" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><h1>Favourite</h1></button>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="product-table">
                                <Table columns={columns} dataSource={arrProduct} />
                            </div>
                        </div>
                        <div className="tab-pane " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <Table columns={columnFavouriteProduct} dataSource={arrayProductFavorite} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile