import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PageConstant } from '../../common/page.constant'
import { DispatchType } from '../../redux/config-store'
import { userLoginModel } from '../../models/user.model'
import { userLoginApi } from '../../redux/users-reducer/user-reducer'
import './login.scss'


type Props = {}

const Login = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };

    const onSubmit = (userLogin: userLoginModel) => {
        const actionAsyncLogin = userLoginApi(userLogin);
        dispatch(actionAsyncLogin);
    }
    // const responseFacebook = (responseFacebook) => {
    //     console.log(responseFacebook)
    // }
    return (
        <div>
            <div className="title-component my-3">
                <h1>Login</h1>
            </div>
            <hr />
            <Form layout="vertical" name="basic" validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                    <Input className='input-form-login' />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                    <Input.Password className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                    <NavLink className='text-register' to={`${PageConstant.register}`}>Register now ?</NavLink>
                    <Button className='btn-login ms-3' htmlType='submit' type="primary">Login</Button>
                </Form.Item>
                {/* <Form.Item>
                <a className='py-3 login-facebook'>
                    <FacebookOutlined className='me-2 icon-facebook' style={{ fontSize: "40px" }} />
                    <FacebookLogin
                        appId="874608447300024"
                        autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass="btn"
                        icon="fa-facebook"
                    />
                </a>
            </Form.Item> */}
            </Form>
        </div>
    )
}

export default Login