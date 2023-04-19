import React, { useState } from 'react'
import LoginForm from '../../components/form-login/form-login'
import { DispatchType } from '../../redux/config-store';
import { useDispatch } from 'react-redux';
import { UserUpdateModel } from '../../models/user.model';
import { userRegisterApi } from '../../redux/users-reducer/user-reducer';

type Props = {}

const Register = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const userRegister = (userRegister: UserUpdateModel) => {
        dispatch(userRegisterApi(userRegister));
    }
    return (
        <div>
            <div className="title-component my-3">
                <h1>Register</h1>
            </div>
            <hr />
            <LoginForm user={null} submitted={userRegister} />
        </div>
    )
}

export default Register