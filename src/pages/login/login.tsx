import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/config-store'
import { UserModel, userLoginModel } from '../../models/user.model'
import { userLoginApi } from '../../redux/users-reducer/user-reducer'
import LoginForm from '../../components/form-login/form-login'
import './login.scss'
import { Form } from 'antd'
import { useEffect } from 'react'
import { history } from '../../app'
import { PageConstant } from '../../common/page.constant'


type Props = {}

const Login = (props: Props) => {
    const { userProfile } = useSelector((state: RootState) => state.userReducer)
    const dispatch: DispatchType = useDispatch();
    const userLogin = async (userLogin: userLoginModel) => {
        const actionAsyncLogin = userLoginApi(userLogin);
        await dispatch(actionAsyncLogin);
        history.push(PageConstant.profile);
    }

    useEffect(() => {
        if (userProfile && userProfile !== null || undefined) {
            history.push(PageConstant.profile)
        }
    }, [userProfile])
    return (
        <div>
            <div className="title-component my-3">
                <h1>Login</h1>
            </div>
            <hr />
            <LoginForm user={!null} submitted={userLogin} />
        </div>
    )
}

export default Login