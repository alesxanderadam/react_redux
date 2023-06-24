import { Route, Routes, unstable_HistoryRouter as HistoryBrowser, } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import HomeTemplate from './templates/home-template';
import ResponsiveItem from './components/responsive-item';
import Home from './pages/home/home';
import './assets/scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { PageConstant } from './common/page.constant';
import Detail from './pages/detail/detail';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Profile from './pages/profile/profile';
import Cart from './pages/cart/cart';
import NotFound from './pages/not-found/not-found';
import Search from './pages/search/search';
export const history: any = createBrowserHistory()


export default function App() {
    return (
        <HistoryBrowser history={history}>
            <Routes>
                <Route element={<HomeTemplate />}>
                    <Route index element={<ResponsiveItem component={Home} componentMobile={Home} />} />
                    <Route path={`${PageConstant.detail}/:id`} element={<Detail />} />
                    <Route path={`${PageConstant.login}`} element={<Login />} />
                    <Route path={`${PageConstant.register}`} element={<Register />} />
                    <Route path={`${PageConstant.profile}`} element={<Profile />} />
                    <Route path={`${PageConstant.cart}`} element={<Cart />} />
                    <Route path={`${PageConstant.search}`} element={<Search />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HistoryBrowser>
    )
}
