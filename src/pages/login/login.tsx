import { useDispatch } from 'react-redux'
import { DispatchType } from '../../redux/config-store'
import { UserModel, userLoginModel } from '../../models/user.model'
import { userLoginApi } from '../../redux/users-reducer/user-reducer'
import LoginForm from '../../components/form-login/form-login'
import './login.scss'


type Props = {}

const Login = (props: Props) => {
    const dispatch: DispatchType = useDispatch();
    const userLogin = (userLogin: userLoginModel) => {
        const actionAsyncLogin = userLoginApi(userLogin);
        dispatch(actionAsyncLogin);
    }



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