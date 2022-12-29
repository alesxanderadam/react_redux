import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { PageConstant } from '../common/page.constant'
import { RootState } from '../redux/config-store'
import { useSelector } from 'react-redux'
import './template.scss'
import { ACCESS_TOKEN, settings, USER_LOGIN } from '../util/config'
type Props = {}

const HomeTemplate = (props: Props) => {
    const { userLogin } = useSelector((state: RootState) => state.userReducer);
    const navigate = useNavigate()
    const renderLoginButton = () => {
        if (userLogin) {
            return <>
                <NavLink to={`${PageConstant.profile}`} style={{ textDecoration: 'none' }}> <h5 className='login mx-2'> He sờ lô ! {userLogin.email}</h5></NavLink>
                <span className='text-danger' style={{ cursor: 'pointer', paddingRight: '15px' }} onClick={() => { settings.clearStorage(ACCESS_TOKEN); settings.clearStorage(USER_LOGIN); navigate(`${PageConstant.login}`); window.location.reload(); }}>Logout</span>
            </>
        }
        return <NavLink to={`${PageConstant.login}`} style={{ textDecoration: 'none' }}><h5 className='login mx-2'>Login</h5></NavLink>;
    }
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
                        <div className="d-flex align-items-center text-white" style={{ position: 'relative' }}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <h3 className='search ms-2'>Search</h3>
                        </div>
                        <div className='d-flex align-items-center text-white mx-2'>
                            <h2 className='icon-shopping'>🛒</h2>
                            <h3 className='amount'>(1)</h3>
                        </div>
                        {renderLoginButton()}
                        <NavLink style={{ textDecoration: 'none' }} to={`${PageConstant.register}`}><h5 className='login mx-2'>Register</h5></NavLink>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ minHeight: '90vh' }}>
                <Outlet />
            </div>
            <footer className='bg-light text-dark text-center p-3 mt-5'>
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