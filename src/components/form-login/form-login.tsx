import { Button, Form, Input, Radio } from 'antd'
import { NavLink } from 'react-router-dom';
import { PageConstant } from '../../common/page.constant';
import { UserUpdateModel } from '../../models/user.model';
import { useEffect, useState } from 'react';

const LoginForm = ({
    user,
    submitted,
}: {
    user?: any;
    submitted: (user: UserUpdateModel) => void;
}) => {
    const [form] = Form.useForm();
    const [valueGender, setvalueGender] = useState(true);


    const validateMessages = {
        required: '${label} không được bỏ trống!',
        types: {
            email: '${label} không phải là Email!',
        },
    };

    const onSubmit = (values: UserUpdateModel) => {
        submitted(values);
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user);
        }

    }, [user]);

    const checkUser = () => {
        if (!user) {
            return <>
                <Form.Item label="Name" name="name" rules={[{ required: true, type: "string" }]}>
                    <Input className='input-form-login' />
                </Form.Item>

                <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                    <Radio.Group value={valueGender}>
                        <Radio value={true}>Boy</Radio>
                        <Radio value={false}>Girl</Radio>
                    </Radio.Group>
                </Form.Item>


                <Form.Item label="Phone number" name="phone" rules={[{ required: true, type: "string", max: 12, min: 8 }]}>
                    <Input className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
                </Form.Item>
            </>
        }
    }
    return (
        <Form layout="vertical" name="basic" validateMessages={validateMessages} wrapperCol={{ span: 25 }} onFinish={onSubmit}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                <Input className='input-form-login' />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                <Input.Password className='input-form-login' style={{ background: "rgba(33, 33, 33, -0.92)" }} />
            </Form.Item>

            {checkUser()}

            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
                <NavLink className='text-register' to={`${PageConstant.register}`}>Register now ?</NavLink>
                <Button className='btn-login ms-3' htmlType='submit' type="primary">Login</Button>
            </Form.Item>
        </Form>
    );
};
export default LoginForm;